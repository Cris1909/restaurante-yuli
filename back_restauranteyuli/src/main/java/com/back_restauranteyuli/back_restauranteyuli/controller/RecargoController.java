package com.back_restauranteyuli.back_restauranteyuli.controller;

import com.back_restauranteyuli.back_restauranteyuli.Service.IRecargoService;
import com.back_restauranteyuli.back_restauranteyuli.model.Recargo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recargos")
public class RecargoController {

    @Autowired
    private IRecargoService recargoService;

    @GetMapping("/listar")
    public List<Recargo> getRecargos(){
        return recargoService.getRecargos();
    }

    @PostMapping("/crear")
    public void saveRecargo(Recargo Recargo){
        recargoService.saveRecargo(Recargo);
    }

}
