package com.back_restauranteyuli.back_restauranteyuli.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.Producto;
import com.back_restauranteyuli.back_restauranteyuli.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService implements IProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public List<Producto> getProductos() {
        List<Producto> listaProductos = productoRepository.findAll();
        return listaProductos;
    }

    @Override
    public void saveProducto(Producto Producto) {
        productoRepository.save(Producto);
    }

    @Override
    public void deleteProducto(Integer id) {
        productoRepository.deleteById(id);
    }

    /*
    @Override
    public List<producto> findProducto(String nom_prod) {
        List<producto> Producto = productoRepository.findByNomProdContaining(nom_prod);
        return Producto;
    }
    */

    @Override
    public void editProducto(Producto Producto) {
        this.saveProducto(Producto);
    }
}
