package com.back_restauranteyuli.back_restauranteyuli.controller;

import com.back_restauranteyuli.back_restauranteyuli.Service.IProductoService;
import com.back_restauranteyuli.back_restauranteyuli.model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private IProductoService productoService;

    @GetMapping("/traer")
    public List<Producto> getProductos(){
        return productoService.getProductos();
    }
    /*
    @GetMapping("/productos/traer/{nom_prod}")
    public List<producto> findByName(@PathVariable String nom_prod){
        List<producto> Producto = productoService.findProducto(nom_prod);
        return Producto;
    }
    */

    @PostMapping("/crear")
    public void saveProducto(@RequestBody Producto Producto){
        productoService.saveProducto(Producto);
        System.out.println("El producto fue creado correctamente");
    }

    @DeleteMapping("/eliminar/{id}")
    public void deleteProducto(@PathVariable Integer id){
        productoService.deleteProducto(id);
        System.out.println("El producto fue eliminado correctamente");
    }

    @PutMapping("/editar")
    public void editProducto(@RequestBody Producto Producto){
        productoService.editProducto(Producto);

    }
}
