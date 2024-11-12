package com.back_restauranteyuli.back_restauranteyuli.Service;

import com.back_restauranteyuli.back_restauranteyuli.model.Recargo;
import com.back_restauranteyuli.back_restauranteyuli.repository.RecargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecargoService implements IRecargoService {

    @Autowired
    private RecargoRepository recargoRepository;

    @Override
    public List<Recargo> getRecargos() {
        return recargoRepository.findAll();
    }

    @Override
    public void saveRecargo(Recargo Recargo) {
        recargoRepository.save(Recargo);
    }
}
