package com.back_restauranteyuli.back_restauranteyuli.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.tipo_clientes;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ITc_Service {

    public List<tipo_clientes> getTipo_clientes();

}
