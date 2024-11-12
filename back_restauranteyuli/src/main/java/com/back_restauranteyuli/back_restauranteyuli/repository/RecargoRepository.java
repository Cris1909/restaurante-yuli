package com.back_restauranteyuli.back_restauranteyuli.repository;

import com.back_restauranteyuli.back_restauranteyuli.model.Recargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecargoRepository extends JpaRepository<Recargo, Integer> {

}
