package com.back_restauranteyuli.back_restauranteyuli.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tmtipo_clientes")
public class tipo_clientes {

    @Id
    @NotNull
    @Column(name = "cod_tc")
    private Integer id;

    @NotEmpty
    @Column(name = "dtipo_cliente")
    private String dtipo_cliente;

    public tipo_clientes(){
        super();
    }

    public tipo_clientes(Integer id, String dtipo_cliente) {
        this.id = id;
        this.dtipo_cliente = dtipo_cliente;
    }

    public @NotNull Integer getId() {
        return id;
    }

    public void setId(@NotNull Integer id) {
        this.id = id;
    }

    public @NotEmpty String getDtipo_cliente() {
        return dtipo_cliente;
    }

    public void setDtipo_cliente(@NotEmpty String dtipo_cliente) {
        this.dtipo_cliente = dtipo_cliente;
    }
}
