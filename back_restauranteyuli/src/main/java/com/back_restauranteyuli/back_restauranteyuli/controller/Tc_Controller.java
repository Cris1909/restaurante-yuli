package com.back_restauranteyuli.back_restauranteyuli.controller;

import com.back_restauranteyuli.back_restauranteyuli.Service.ITc_Service;
import com.back_restauranteyuli.back_restauranteyuli.model.TipoClientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tipo-clientes")
public class Tc_Controller {

    @Autowired
    private ITc_Service tcService;

    @GetMapping("/listar")
    public List<TipoClientes> getTipoClientes(){
       return tcService.getTipo_clientes();
    }

}
