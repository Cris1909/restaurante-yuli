package com.back_restauranteyuli.back_restauranteyuli.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.producto;

@Service
public interface IProductoService {


    public List<producto> getProductos();

    public void saveProducto(producto Producto);

    public void deleteProducto(Integer id);

    // public List<producto> findProducto(String nom_prod);

    public void editProducto (producto Producto);

}
