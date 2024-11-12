package com.back_restauranteyuli.back_restauranteyuli.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.TipoClientes;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ITc_Service {

    public List<TipoClientes> getTipo_clientes();

}
