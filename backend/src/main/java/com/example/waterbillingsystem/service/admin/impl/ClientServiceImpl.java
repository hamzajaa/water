package com.example.waterbillingsystem.service.admin.impl;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.dao.ClientDao;
import com.example.waterbillingsystem.service.admin.facade.ClientService;
import com.example.waterbillingsystem.service.util.ListUtil;
import com.example.waterbillingsystem.service.util.SearchUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.ClientVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientDao clientDao;
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Client> findAll() {
        return clientDao.findAll();
    }

    @Override
    public Client findById(Long id) {
        if (id == null) return null;
        else {
            return clientDao.getOne(id);
        }
    }

    @Override
    public Client findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Override
    public int deleteById(Long id) {
        int res = 0;
        if (clientDao.findById(id).isPresent()) {
            clientDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public Client save(Client client) {
        Client foundedClient = clientDao.findByCounterNumber(client.getCounterNumber());
        setAttributeStatusDutyEngagePrice(client);
        Client result = null;
        if (foundedClient == null) {
            result = clientDao.save(client);
        }
        return result;
    }

    private void setAttributeStatusDutyEngagePrice(Client client) {
        if (client != null) {
            if (client.getDutyEngagePrice().equals(new BigDecimal("700"))) {
                client.setStatusDutyEngagePrice("complete");
            } else {
                client.setStatusDutyEngagePrice("pending");
            }
        } else {
            return;
        }
    }

    @Override
    public List<Client> save(List<Client> clients) {
        List<Client> clientList = new ArrayList<>();
        clients.parallelStream().filter(c -> clientList.add(save(c))).toList();
        return clientList;
    }

    @Override
    public Client update(Client client) {
        Client foundedClient = findById(client.getId());
        if (foundedClient == null) return null;
        else {
            return clientDao.save(client);
        }
    }

    @Override
    @Transactional
    public int delete(Client client) {
        Client foundedClient = findById(client.getId());
        if (foundedClient == null) {
            return -1;
        } else {
            clientDao.deleteById(client.getId());
            return 1;
        }
    }

    @Override
    public List<Client> findByCriteria(ClientVo vo) {
        String query = "SELECT c FROM Client c WHERE 1=1";
        query += SearchUtil.addConstraint("c", "id", "=", vo.getId());
        query += SearchUtil.addConstraint("c", "userName", "LIKE", vo.getUserName());
        query += SearchUtil.addConstraint("c", "cni", "LIKE", vo.getCni());
        query += SearchUtil.addConstraint("c", "counterNumber", "=", vo.getCounterNumber());
        query += SearchUtil.addConstraint("c", "address", "LIKE", vo.getAddress());
        query += SearchUtil.addConstraint("c", "phone", "LIKE", vo.getPhone());
        query += SearchUtil.addConstraint("c", "dutyEngagePrice", "=", vo.getDutyEngagePrice());
        query += SearchUtil.addConstraint("c", "statusDutyEngagePrice", "LIKE", vo.getStatusDutyEngagePrice());
        query += SearchUtil.addConstraintDate("c", "recordDate", "=", vo.getRecordDate());
        query += SearchUtil.addConstraintMinMaxDate("o", "recordDate", vo.getRecordDateMin(), vo.getRecordDateMax());
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(List<Client> list) {
        if (ListUtil.isNotEmpty(list)) {
            //list.forEach(this::delete);
            list.stream().map(this::delete).toList();
        }
    }

    @Override
    public void update(List<Client> list) {
        if (ListUtil.isNotEmpty(list)) {
            list.parallelStream().map(this::update).toList();
        }
    }

    @Override
    public Client findByIdOrCounterNumber(Client client) {
        Client result = null;
        if (client != null) {
            if (StringUtil.isNotEmpty(client.getId())) {
                result = clientDao.getOne(client.getId());
            } else {
                StringUtil.isNotEmpty2(client.getCounterNumber());
                result = clientDao.findByCounterNumber(client.getCounterNumber());
            }
        }
        return result;
    }

    @Override
    public Client findByUserName(String userName) {
        return clientDao.findByUserName(userName);
    }
}
