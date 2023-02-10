package com.example.waterbillingsystem.ws.rest.provided.converter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public abstract class AbstractConverter<E, V> {

    public abstract E toEntity(V vo);

    public abstract V toVo(E entity);

    public List<E> toEntity(List<V> vos) {
        if (vos == null || vos.isEmpty()) {
            return Collections.emptyList();
        } else {
            List<E> entitys = new ArrayList<>();
            for (V vo : vos) {
                entitys.add(toEntity(vo));
            }
            return entitys;
        }
    }

    public List<V> toVo(List<E> entitys) {
        if (entitys == null || entitys.isEmpty()) {
            return Collections.emptyList();
        } else {
            List<V> vos = new ArrayList<>();
            for (E entity : entitys) {
                vos.add(toVo(entity));
            }
            return vos;
        }
    }
}
