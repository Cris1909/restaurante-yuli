package com.back_restauranteyuli.back_restauranteyuli.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.back_restauranteyuli.back_restauranteyuli.model.producto;
import java.util.List;

public interface ProductoRepository extends JpaRepository<producto, Integer> {
}
