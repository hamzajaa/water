package com.example.waterbillingsystem.service.admin.facade;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.service.core.AbstractService;
import com.example.waterbillingsystem.ws.rest.provided.vo.ClientVo;

import java.util.List;

public interface ClientService extends AbstractService<Client, Long, ClientVo> {

    /**
     * find all E in database
     *
     * @return List<E> , If database is empty return  null.
     */
     List<Client> findAll();

    /**
     * find E from database by id (id)
     *
     * @param id - id of E
     * @return the founded  E , If no E were
     * found in database return  null.
     */
     Client findById(Long id);

    /**
     * find E from database (with associated lists) by id (id)
     *
     * @param id - id of E
     * @return the founded  E , If no E were
     * found in database return  null.
     */
     Client findByIdWithAssociatedList(Long id);

    /**
     * delete E from database
     *
     * @param id - id of E to be deleted
     */
     int deleteById(Long id);

    /**
     * save E in database
     *
     * @param entity - E to be saved
     * @return the saved E, If the E can't be saved return null.
     */
     Client save(Client entity);

    /**
     * save list E in database
     *
     * @param list - list of E to be saved
     * @return the saved E list
     */
     List<Client> save(List<Client> list);

    /**
     * update E in database
     *
     * @param E - E to be updated
     * @return the updated E, If the E can't be updated return null.
     */
     Client update(Client E);

    /**
     * delete E from database
     *
     * @param E - E to be deleted
     * @return 1 if E deleted successfully, If the E can't be deleted return negative int
     */
     int delete(Client E);

    /**
     * search for E in by some criteria
     *
     * @param vo
     * @return the searhed list E
     */
     List<Client> findByCriteria(ClientVo vo);

    /**
     * delete  list of E
     *
     * @param list
     */
     void delete(List<Client> list);

    /**
     * update liste of  E
     *
     * @param list
     */
     void update(List<Client> list);

     Client findByIdOrCounterNumber(Client client);
     Client findByUserName(String userName);

}
