package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.service.admin.facade.ClientService;
import com.example.waterbillingsystem.ws.rest.provided.converter.ClientConverter;
import com.example.waterbillingsystem.ws.rest.provided.vo.ClientVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin/client")
@RestController
public class ClientRestAdmin {
    @Autowired
    private ClientService clientService;
    @Autowired
    private ClientConverter clientConverter;

    @GetMapping("/")
    public List<ClientVo> findAll() {
        return clientConverter.toVo(clientService.findAll());
    }

    @GetMapping("/id/{id}")
    public ClientVo findById(@PathVariable Long id) {
        return clientConverter.toVo(clientService.findById(id));
    }

    @GetMapping("/detail/id/{id}")
    public ClientVo findByIdWithAssociatedList(@PathVariable Long id) {
        clientService.findByIdWithAssociatedList(id).getRecordDate();
        return clientConverter.toVo(clientService.findByIdWithAssociatedList(id));
    }

    @DeleteMapping("/id/{id}")
    public int deleteById(@PathVariable Long id) {
        return clientService.deleteById(id);
    }

    @PostMapping("/")
    public ClientVo save(@RequestBody ClientVo clientVo) {
        Client client = clientConverter.toEntity(clientVo);
        client = clientService.save(client);
        return clientConverter.toVo(client);
    }

    @PostMapping("/save-list")
    public List<ClientVo> save(@RequestBody List<ClientVo> clientVos) {
        List<Client> paymentStatuses = clientConverter.toEntity(clientVos);
        paymentStatuses = clientService.save(paymentStatuses);
        return clientConverter.toVo(paymentStatuses);
    }

    @PutMapping("/")
    public ClientVo update(@RequestBody ClientVo clientVo) {
        Client client = clientConverter.toEntity(clientVo);
        client = clientService.update(client);
        return clientConverter.toVo(client);
    }

    @DeleteMapping("/")
    public int delete(@RequestBody ClientVo clientVo) {
        return clientService.delete(clientConverter.toEntity(clientVo));
    }

    @PostMapping("/find-criteria")
    public List<ClientVo> findByCriteria(@RequestBody ClientVo clientVo) {
        return clientConverter.toVo(clientService.findByCriteria(clientVo));
    }

    @DeleteMapping("/delete-list")
    public void delete(@RequestBody List<ClientVo> clientVos) {
        clientService.delete(clientConverter.toEntity(clientVos));
    }

    @PutMapping("/update-list")
    public void update(@RequestBody List<ClientVo> clientVos) {
        clientService.update(clientConverter.toEntity(clientVos));
    }

    @PostMapping("/find-id-counterNumber")
    public ClientVo findByIdOrCounterNumber(@RequestBody ClientVo clientVo) {
        Client client = clientConverter.toEntity(clientVo);
        client = clientService.findByIdOrCounterNumber(client);
        return clientConverter.toVo(client);
    }
}
