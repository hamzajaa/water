package com.example.waterbillingsystem.service.admin.facade;


import com.example.waterbillingsystem.bean.Payment;
import com.example.waterbillingsystem.service.core.AbstractService;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentVo;

import java.util.List;

public interface PaymentService extends AbstractService<Payment, Long, PaymentVo> {

    /**
     * find all E in database
     *
     * @return List<E> , If database is empty return  null.
     */
    ;

    List<Payment> findAll();

    /**
     * find E from database by id (id)
     *
     * @param id - id of E
     * @return the founded  E , If no E were
     * found in database return  null.
     */
    ;

    Payment findById(Long id);

    /**
     * find E from database (with associated lists) by id (id)
     *
     * @param id - id of E
     * @return the founded  E , If no E were
     * found in database return  null.
     */
    ;

    Payment findByIdWithAssociatedList(Long id);

    /**
     * delete E from database
     *
     * @param id - id of E to be deleted
     */
    ;

    int deleteById(Long id);

    /**
     * save E in database
     *
     * @param entity - E to be saved
     * @return the saved E, If the E can't be saved return null.
     */
    ;

    Payment save(Payment entity);

    /**
     * save list E in database
     *
     * @param list - list of E to be saved
     * @return the saved E list
     */
    ;

    List<Payment> save(List<Payment> list);

    /**
     * update E in database
     *
     * @param E - E to be updated
     * @return the updated E, If the E can't be updated return null.
     */
    ;

    Payment update(Payment E);

    /**
     * delete E from database
     *
     * @param E - E to be deleted
     * @return 1 if E deleted successfully, If the E can't be deleted return negative int
     */
    ;

    int delete(Payment E);

    /**
     * search for E in by some criteria
     *
     * @param vo
     * @return the searhed list E
     */
    ;

    List<Payment> findByCriteria(PaymentVo vo);

    /**
     * delete  list of E
     *
     * @param list
     */
    ;

    void delete(List<Payment> list);

    /**
     * update liste of  E
     *
     * @param list
     */
    ;

    void update(List<Payment> list);


}
