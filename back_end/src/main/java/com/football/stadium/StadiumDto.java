package com.football.stadium;

import com.football.stadium.detail.StadiumDetailDto;
import com.football.stadium.image.StadiumImageDto;
import com.football.stadium.option.StadiumOptionDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * A DTO for the {@link Stadium} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StadiumDto implements Serializable {

    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String address;

    @NotBlank
    private Long districtId;

    @NotBlank
    private Long provinceId;

    private MultipartFile avatarFile;

    private String description;

    private String createdBy;
    private Timestamp createdDate;
    private Integer status;

    @NotNull
    private List<StadiumDetailDto> details;
    private List<StadiumImageDto> images = new ArrayList<>();
    private List<StadiumOptionDto> options = new ArrayList<>();
}