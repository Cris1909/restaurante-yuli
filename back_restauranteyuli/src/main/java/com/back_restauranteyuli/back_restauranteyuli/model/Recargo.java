package com.back_restauranteyuli.back_restauranteyuli.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tmrecargos")
public class Recargo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cod_rec")
    private Integer cod_rec;

    @NotNull
    @Column(name = "recargo_cliente")
    private Integer recargo_cliente;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkcod_prod_rec", referencedColumnName = "cod_prod")
    private Producto producto;

    @NotNull
    @Column(insertable=false, updatable=false)
    private Integer fkcod_tc_rec;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fkcod_tc_rec", referencedColumnName = "cod_tc")
    private TipoClientes tipoClientes;

    public Recargo(){
        super();
    }

    public Recargo(Integer cod_rec, Integer recargo_cliente, Integer fkcod_tc_rec, Producto producto, TipoClientes tipoClientes) {
        this.cod_rec = cod_rec;
        this.recargo_cliente = recargo_cliente;
        this.fkcod_tc_rec = fkcod_tc_rec;
        this.producto = producto;
        this.tipoClientes = tipoClientes;
    }

    public Integer getCod_rec() {
        return cod_rec;
    }

    public void setCodRec(Integer cod_rec) {
        this.cod_rec = cod_rec;
    }

    public @NotNull Integer getFkcod_tc_rec() {
        return fkcod_tc_rec;
    }

    public void setFkcod_tc_rec(@NotNull Integer fkcod_tc_rec) {
        this.fkcod_tc_rec = fkcod_tc_rec;
    }


    public @NotNull Integer getRecargoCliente() {
        return recargo_cliente;
    }

    public void setRecargoCliente(@NotNull Integer recargo_cliente) {
        this.recargo_cliente = recargo_cliente;
    }


}
