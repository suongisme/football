package com.football.feedback;

import com.football.admin.feedback.Feedback;
import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class FeedbackMapper extends Mapper<Feedback, FeedbackDto> {

    public FeedbackMapper() {
        super(Feedback.class, FeedbackDto.class);
    }
}
