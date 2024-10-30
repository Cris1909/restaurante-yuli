package com.back_restauranteyuli.back_restauranteyuli.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "tmstatus")
public class status {

    @Id
    @Column(name = "cods")
    private Integer cods;

    @NotEmpty
    @Column(name = "dstatus")
    private String dstatus;
    

    public status() {
        super();
    }

    public status(@NotEmpty String dstatus) {
        this.dstatus = dstatus;
    }

    public Integer getCode() {
        return cods;
    }

    public void setCode(Integer code) {
        this.cods = code;
    }

    public String getDstatus() {
        return dstatus;
    }

    public void setDstatus(String dstatus) {
        this.dstatus = dstatus;
    }

}
