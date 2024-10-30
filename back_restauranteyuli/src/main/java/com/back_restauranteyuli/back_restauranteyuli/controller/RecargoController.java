package com.back_restauranteyuli.back_restauranteyuli.controller;

import com.back_restauranteyuli.back_restauranteyuli.Service.IRecargoService;
import com.back_restauranteyuli.back_restauranteyuli.model.recargo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecargoController {

    @Autowired
    private IRecargoService recargoService;

    @GetMapping("/recargos/tener")
    public List<recargo> getRecargos(){
        return recargoService.getRecargos();
    }

    @PostMapping("/recargos/crear")
    public void saveRecargo(recargo Recargo){
        recargoService.saveRecargo(Recargo);
    }

}
