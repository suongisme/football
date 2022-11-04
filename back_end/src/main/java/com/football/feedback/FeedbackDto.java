package com.football.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto implements Serializable {
    private String id;
    private String content;
    private String username;
    private Date createdDate;
}