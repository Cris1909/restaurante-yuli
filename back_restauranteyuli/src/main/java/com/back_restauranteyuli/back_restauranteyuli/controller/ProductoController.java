package com.back_restauranteyuli.back_restauranteyuli.controller;

import java.util.List;

import com.back_restauranteyuli.back_restauranteyuli.Service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.back_restauranteyuli.back_restauranteyuli.Service.ProductoService;
import com.back_restauranteyuli.back_restauranteyuli.model.producto;

@RestController
public class ProductoController {

    @Autowired
    private IProductoService productoService;

    @GetMapping("/productos/traer")
    public List<producto> getProductos(){
        return productoService.getProductos();
    }
    /*
    @GetMapping("/productos/traer/{nom_prod}")
    public List<producto> findByName(@PathVariable String nom_prod){
        List<producto> Producto = productoService.findProducto(nom_prod);
        return Producto;
    }
    */

    @PostMapping("/productos/crear")
    public void saveProducto(@RequestBody producto Producto){
        productoService.saveProducto(Producto);
        System.out.println("El producto fue creado correctamente");
    }

    @DeleteMapping("/productos/eliminar/{id}")
    public void deleteProducto(@PathVariable Integer id){
        productoService.deleteProducto(id);
        System.out.println("El producto fue eliminado correctamente");
    }

    @PutMapping("/productos/editar")
    public void editProducto(@RequestBody producto Producto){
        productoService.editProducto(Producto);

    }
}
