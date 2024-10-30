package com.back_restauranteyuli.back_restauranteyuli.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.recargo;
import com.back_restauranteyuli.back_restauranteyuli.repository.RecargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecargoService implements IRecargoService {

    @Autowired
    private RecargoRepository recargoRepository;

    @Override
    public List<recargo> getRecargos() {
        return recargoRepository.findAll();
    }

    @Override
    public void saveRecargo(recargo Recargo) {
        recargoRepository.save(Recargo);
    }
}
