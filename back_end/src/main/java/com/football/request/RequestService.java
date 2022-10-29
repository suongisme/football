package com.football.request;

import com.football.common.dto.ResultDTO;
import com.football.common.utils.DateUtils;
import com.football.common.utils.ResultUtils;
import com.football.mail.MailDTO;
import com.football.mail.MailService;
import com.football.mail.MailTemplate;
import com.football.stadium.Stadium;
import com.football.stadium.StadiumRepository;
import com.football.stadium.type.StadiumType;
import com.football.stadium.type.StadiumTypeRepository;
import com.football.stadium.type.detail.StadiumDetail;
import com.football.stadium.type.detail.StadiumDetailRepository;
import com.football.user.User;
import com.football.user.UserDto;
import com.football.user.UserRepository;
import com.football.user.UserService;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RequestService {

    private final UserService userService;
    private final MailService mailService;

    private final RequestRepository requestRepository;
    private final StadiumDetailRepository stadiumDetailRepository;
    private final StadiumRepository stadiumRepository;
    private final StadiumTypeRepository stadiumTypeRepository;
    private final UserRepository userRepository;

    private final RequestMapper requestMapper;

    private final ValidatorService validator;

    @Transactional
    public ResultDTO requestStadium(RequestDto requestDto) {
        log.info("request to book a stadium: {}", requestDto);

        StadiumDetail stadiumDetail = this.stadiumDetailRepository.findById(requestDto.getStadiumDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));

        Optional<Request> requestOpt = this.requestRepository.findApprovedByStadiumDetailIdAndHireDate(stadiumDetail.getId(), DateUtils.dateToString(requestDto.getHireDate(), "yyyy-MM-dd"));
        if (requestOpt.isPresent()) {
            throw new IllegalArgumentException("Thời gian này đã có người đặt trước.");
        }

        UserDto currentUser = this.userService.getCurrentUser();
        Request request = this.requestMapper.toEntity(requestDto);
        request.setCreatedBy(currentUser.getUsername());
        request.setCreatedDate(Instant.now());
        request.setStatus(RequestStatus.PENDING.getStatus());
        request = this.requestRepository.save(request);
        this.sendMailToOwnerStadium(request, stadiumDetail, currentUser);
        log.info("request booking successfully");
        return ResultUtils.buildSuccessResult(request);
    }

    @Async
    public void sendMailToOwnerStadium(Request request, StadiumDetail stadiumDetail, UserDto currentUser) {
        log.info("send mail to owner stadium");
        StadiumType stadiumType = this.stadiumTypeRepository.findById(stadiumDetail.getParentId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));

        Optional<Stadium> stadiumOpt = this.stadiumRepository.findById(stadiumType.getStadiumId());

        if (!stadiumOpt.isPresent()) return;

        Stadium stadium = stadiumOpt.get();

        User ownerStadium = this.userRepository.findByUsername(stadium.getCreatedBy()).orElse(new User());

        MailDTO mailDTO = new MailDTO();
        mailDTO.setSubject("[THÔNG BÁO] YÊU CẦU ĐĂNG KÝ THUÊ SÂN: " + stadium.getName());
        mailDTO.setTemplateContent(MailTemplate.REQUEST_BOOKING);
        mailDTO.setTo(new String[] {ownerStadium.getEmail()});
        mailDTO.setParamsTemplate(new HashMap<>());

        Map<String, Object> params = mailDTO.getParamsTemplate();
        params.put("param0", ownerStadium.getFullName());
        params.put("param1", stadium.getName());
        params.put("param2", currentUser.getUsername());
        params.put("param3", stadium.getName());
        params.put("param4", stadiumDetail.getStartTime().toString() + "-" + stadiumDetail.getEndTime().toString() + " " + DateUtils.dateToString(request.getHireDate(), "dd-MM-yyyy"));
        params.put("param5", stadiumDetail.getPrice().toString());
        params.put("param6", currentUser.getUsername());
        params.put("param7", currentUser.getFullName());
        params.put("param8", currentUser.getEmail());
        params.put("param9", currentUser.getPhone());
        this.mailService.send(mailDTO);
    }

    public List<PendingRequestDto> getStadiumRequest(String stadiumId) {
        log.info("get request of stadium: {}", stadiumId);
        this.stadiumRepository.findById(stadiumId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));
        return this.requestRepository.findStadiumRequest(stadiumId);
    }

    public ResultDTO approveRequest(PendingRequestDto pendingRequestDto) {
        log.info("approve a request: {}", pendingRequestDto);
        this.requestRepository.findById(pendingRequestDto.getRequestId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lời yêu cầu"));

        List<Request> requests = this.requestRepository.findAllByHireDateAndStadiumDetailId(
                DateUtils.dateToString(pendingRequestDto.getHireDate(), "yyyy-MM-dd"),
                pendingRequestDto.getDetailId()
        );

        Stadium stadium = this.stadiumRepository.findByStadiumDetailId(pendingRequestDto.getDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));

        requests.forEach(request -> {
            if (request.getId() == pendingRequestDto.getRequestId()) {
                request.setStatus(RequestStatus.APPROVED.getStatus());
                this.requestRepository.save(request);
                this.sendMailToRequester(request, stadium);
                return;
            }

            request.setStatus(RequestStatus.REJECT.getStatus());
            this.requestRepository.save(request);
            this.sendMailToRequester(request, stadium);
        });

        return ResultUtils.buildSuccessResult(null);
    }

    @Async
    public void sendMailToRequester(Request request, Stadium stadium) {
        log.info("send mail to requester: {}", request.getCreatedBy());

        User user = this.userRepository.findByUsername(request.getCreatedBy())
                .orElse(new User());

        MailDTO mailDTO = new MailDTO();
        mailDTO.setTo(new String[] {user.getEmail()});
        mailDTO.setParamsTemplate(new HashMap<>());

        Map<String, Object> param = mailDTO.getParamsTemplate();
        param.put("param0", user.getFullName());
        param.put("param1", stadium.getName());
        if (RequestStatus.APPROVED.getStatus().equals(request.getStatus())) {
            mailDTO.setTemplateContent(MailTemplate.APPROVE_REQUEST);
            mailDTO.setSubject("[CHÚC MỪNG] CHÂP NHẬN YÊU CẦU ĐẶT SÂN");
        }

        if (RequestStatus.REJECT.getStatus().equals(request.getStatus())) {
            mailDTO.setTemplateContent(MailTemplate.REJECT_REQUEST);
            mailDTO.setSubject("[THÔNG BÁO] TỪ CHỐI YÊU CẦU ĐẶT SÂN");
        }
        this.mailService.send(mailDTO);
    }
}
