package com.back_restauranteyuli.back_restauranteyuli.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.Recargo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IRecargoService {

    public List<Recargo> getRecargos();

    public void saveRecargo(Recargo Recargo);
}
