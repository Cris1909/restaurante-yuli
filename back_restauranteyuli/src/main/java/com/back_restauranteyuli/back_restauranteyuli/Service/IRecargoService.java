package com.back_restauranteyuli.back_restauranteyuli.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.recargo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IRecargoService {

    public List<recargo> getRecargos();

    public void saveRecargo(recargo Recargo);
}
