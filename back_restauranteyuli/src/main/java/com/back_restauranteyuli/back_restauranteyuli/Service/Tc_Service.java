package com.back_restauranteyuli.back_restauranteyuli.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.tipo_clientes;
import com.back_restauranteyuli.back_restauranteyuli.repository.Tc_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Tc_Service implements ITc_Service {

    @Autowired
    private Tc_Repository tcRepository;

    @Override
    public List<tipo_clientes> getTipo_clientes() {
        return tcRepository.findAll();
    }
}
