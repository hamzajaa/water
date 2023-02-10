package com.example.waterbillingsystem.service.core;


import java.util.List;


public interface AbstractService<E, I, V> {

    /**
     * find all E in database
     *
     * @return List<E> , If database is empty return  null.
     */
    List<E> findAll();


    /**
     * find E from database by id (id)
     *
     * @param id - id of E
     * @return the founded  E , If no E were
     * found in database return  null.
     */
    E findById(I id);

    /**
     * find E from database (with associated lists) by id (id)
     *
     * @param id - id of E
     * @return the founded  E , If no E were
     * found in database return  null.
     */
    E findByIdWithAssociatedList(I id);


    /**
     * delete E from database
     *
     * @param id - id of E to be deleted
     */
    int deleteById(I id);


    /**
     * save E in database
     *
     * @param entity - E to be saved
     * @return the saved E, If the E can't be saved return null.
     */
    E save(E entity);

    /**
     * save list E in database
     *
     * @param list - list of E to be saved
     * @return the saved E list
     */
    List<E> save(List<E> list);



    /**
     * update E in database
     *
     * @param E - E to be updated
     * @return the updated E, If the E can't be updated return null.
     */
    E update(E E);

    /**
     * delete E from database
     *
     * @param E - E to be deleted
     * @return 1 if E deleted successfully, If the E can't be deleted return negative int
     */
    int delete(E E);


    /**
     * search for E in by some criteria
     *
     * @return the searhed list E
     */
    List<E> findByCriteria(V vo);


    /**
     * delete  list of E
     */
    void delete(List<E> list);

    /**
     * update liste of  E
     */
    void update(List<E> list);


}
