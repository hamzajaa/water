package com.example.waterbillingsystem.service.admin.facade;

import com.example.waterbillingsystem.bean.PaymentStatus;
import com.example.waterbillingsystem.service.core.AbstractService;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentStatusVo;

import java.util.List;

public interface PaymentStatusService extends AbstractService<PaymentStatus, Long, PaymentStatusVo> {

    /**
     * @return
     */
    List<PaymentStatus> findAll();

    /**
     * @param id - id of E
     * @return
     */
    PaymentStatus findById(Long id);

    /**
     * @param id - id of E
     * @return
     */
    PaymentStatus findByIdWithAssociatedList(Long id);

    /**
     * @param id - id of E to be deleted
     * @return
     */
    int deleteById(Long id);

    /**
     * @param entity - E to be saved
     * @return
     */
    PaymentStatus save(PaymentStatus entity);

    /**
     * @param list - list of E to be saved
     * @return
     */
    List<PaymentStatus> save(List<PaymentStatus> list);

    /**
     * @param E - E to be updated
     * @return
     */
    PaymentStatus update(PaymentStatus E);

    /**
     * @param E - E to be deleted
     * @return
     */
    int delete(PaymentStatus E);

    /**
     * @param vo
     * @return
     */
    List<PaymentStatus> findByCriteria(PaymentStatusVo vo);

    /**
     * @param list
     */
    void delete(List<PaymentStatus> list);

    /**
     * @param list
     */
    void update(List<PaymentStatus> list);

    PaymentStatus findByIdOrCode(PaymentStatus paymentStatus);
    PaymentStatus findByCode(String code);

}
