package com.back_restauranteyuli.back_restauranteyuli.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tmproductos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_prod")
    private Integer cod_prod;

    @NotEmpty
    @Column(name = "nom_prod")
    private String nom_prod;

    @NotEmpty
    @Column(name = "dprod")
    private String dprod;

    @NotNull
    @Column(name = "precio_base")
    private Integer precio_base;

    @NotEmpty
    @Column(name = "img_prod")
    private String img_prod;

    @ManyToOne
    @JoinColumn(name = "fkcods_prod", referencedColumnName = "cods")
    public status status;

    @OneToMany(mappedBy = "producto")
    private List<Recargo> recargos;

    public Producto() {
        super();
        recargos = new ArrayList<>();
    }

    public Producto(String nom_prod, String dprod, Integer precio_base,
                    String img_prod, status status) {
        this.nom_prod = nom_prod;
        this.dprod = dprod;
        this.precio_base = precio_base;
        this.img_prod = img_prod;
        recargos = new ArrayList<>();
    }

    public Integer getCod_prod() {
        return cod_prod;
    }

    public void setCod_prod(Integer cod_prod) {
        this.cod_prod = cod_prod;
    }

    public String getNom_prod() {
        return nom_prod;
    }

    public void setNom_prod(String nom_prod) {
        this.nom_prod = nom_prod;
    }

    public String getDprod() {
        return dprod;
    }

    public void setDprod(String dprod) {
        this.dprod = dprod;
    }

    public Integer getPrecio_base() {
        return precio_base;
    }

    public void setPrecio_base(Integer precio_base) {
        this.precio_base = precio_base;
    }

    public String getImg_prod() {
        return img_prod;
    }

    public void setImg_prod(String img_prod) {
        this.img_prod = img_prod;
    }

    public List<Recargo> getRecargos() {
        return recargos;
    }

    public void setRecargos(List<Recargo> recargos) {
        this.recargos = recargos;
    }

    public void addRecargo(Recargo recargo) {
        recargos.add(recargo);
    }

    public void removeRecargo(Recargo recargo) {
        recargos.remove(recargo);
    }
}
