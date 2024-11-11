package com.back_restauranteyuli.back_restauranteyuli.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.back_restauranteyuli.back_restauranteyuli.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
