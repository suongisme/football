package com.football.common.dto;

import lombok.Data;

@Data
public class SearchDTO<T> {

    public static final Integer DEFAULT_PAGE_SIZE = 10;

    private Integer page;
    private Integer pageSize;
    private T data;

    public Integer getPage() {
        if (page < 1) {
            return 1;
        }
        return page;
    }

    public Integer getPageSize() {
        if (pageSize < 0) {
            return DEFAULT_PAGE_SIZE;
        }
        return pageSize;
    }
}
