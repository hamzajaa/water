package com.example.waterbillingsystem.service.admin.facade;

import com.example.waterbillingsystem.bean.PaymentCategory;
import com.example.waterbillingsystem.service.core.AbstractService;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentCategoryVo;

import java.util.List;

public interface PaymentCategoryService extends AbstractService<PaymentCategory,Long, PaymentCategoryVo> {

    /**
     * find all E in database
     *
     * @return List<E> , If database is empty return  null.
     */
     List<PaymentCategory> findAll();

    /**
     * find E from database by id (id)
     *
     * @param id - id of E
     * @return the founded  E , If no E were
     * found in database return  null.
     */
     PaymentCategory findById(Long id) ;

    /**
     * find E from database (with associated lists) by id (id)
     *
     * @param id - id of E
     * @return the founded  E , If no E were
     * found in database return  null.
     */
     PaymentCategory findByIdWithAssociatedList(Long id) ;

    /**
     * delete E from database
     *
     * @param id - id of E to be deleted
     */
     int deleteById(Long id) ;

    /**
     * save E in database
     *
     * @param entity - E to be saved
     * @return the saved E, If the E can't be saved return null.
     */
     PaymentCategory save(PaymentCategory entity) ;

    /**
     * save list E in database
     *
     * @param list - list of E to be saved
     * @return the saved E list
     */
     List<PaymentCategory> save(List<PaymentCategory> list) ;

    /**
     * update E in database
     *
     * @param E - E to be updated
     * @return the updated E, If the E can't be updated return null.
     */
     PaymentCategory update(PaymentCategory E) ;

    /**
     * delete E from database
     *
     * @param E - E to be deleted
     * @return 1 if E deleted successfully, If the E can't be deleted return negative int
     */
     int delete(PaymentCategory E) ;

    /**
     * search for E in by some criteria
     *
     * @param vo
     * @return the searhed list E
     */
     List<PaymentCategory> findByCriteria(PaymentCategoryVo vo) ;

    /**
     * delete  list of E
     *
     * @param list
     */
     void delete(List<PaymentCategory> list) ;

    /**
     * update liste of  E
     *
     * @param list
     */
     void update(List<PaymentCategory> list) ;

    PaymentCategory findByCode(String code);
}
