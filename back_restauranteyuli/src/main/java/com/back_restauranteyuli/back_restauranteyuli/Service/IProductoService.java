package com.back_restauranteyuli.back_restauranteyuli.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.Producto;

@Service
public interface IProductoService {


    public List<Producto> getProductos();

    public void saveProducto(Producto Producto);

    public void deleteProducto(Integer id);

    // public List<producto> findProducto(String nom_prod);

    public void editProducto (Producto Producto);

}
