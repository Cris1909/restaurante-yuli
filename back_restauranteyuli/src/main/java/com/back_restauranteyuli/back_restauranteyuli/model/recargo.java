package com.back_restauranteyuli.back_restauranteyuli.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tmrecargos")
public class recargo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cod_rec")
    private Integer cod_rec;

    @NotNull
    @Column(name = "recargo_cliente")
    private Integer recargo_cliente;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "fkcod_prod_rec", referencedColumnName = "cod_prod")
    private producto Producto;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "fkcod_tc_rec", referencedColumnName = "cod_tc")
    private tipo_clientes Tipo_clientes;

    public recargo(){
        super();
    }

    public recargo(Integer cod_rec, Integer recargo_cliente, producto Producto, tipo_clientes Tipo_clientes) {
        this.cod_rec = cod_rec;
        this.recargo_cliente = recargo_cliente;
        this.Producto = Producto;
        this.Tipo_clientes = Tipo_clientes;
    }

    public Integer getCod_rec() {
        return cod_rec;
    }

    public void setCod_rec(Integer cod_rec) {
        this.cod_rec = cod_rec;
    }

    public @NotNull Integer getRecargo_cliente() {
        return recargo_cliente;
    }

    public void setRecargo_cliente(@NotNull Integer recargo_cliente) {
        this.recargo_cliente = recargo_cliente;
    }
}
