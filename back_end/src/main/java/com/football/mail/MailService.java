package com.football.mail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Async
    public void send(MailDTO mailDTO) {
        try {
            log.info("start to send mail");
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();

            Context context = new Context(LocaleContextHolder.getLocale(), mailDTO.getParamsTemplate());
            String content = this.templateEngine.process(mailDTO.getTemplateContent().getTemplate(), context);
            mimeMessage.setText(content, "UTF-8", MailConstant.TYPE_HTML);
            mimeMessage.setSubject(mailDTO.getSubject());
            mimeMessage.setFrom(MailConstant.SENDER_ADDRESS);

            if (Objects.nonNull(mailDTO.getTo())) {
                for (String to : mailDTO.getTo()) {
                    mimeMessage.addRecipients(Message.RecipientType.TO, to);
                }
            }

            this.mailSender.send(mimeMessage);
            log.info("finished");
        } catch (Exception exception) {
            log.error(exception.getMessage(), exception);
        }
    }
}