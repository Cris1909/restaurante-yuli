package com.back_restauranteyuli.back_restauranteyuli.repository;

import com.back_restauranteyuli.back_restauranteyuli.model.TipoClientes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Tc_Repository extends JpaRepository<TipoClientes, Integer> {

}
