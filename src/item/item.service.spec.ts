import { ItemService } from './item.service';
import { Item } from './item.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ItemService', () => {
  let itemService: ItemService;
  let itemMock;
  let itemRepositoryReturnMock;
  let idMock;
  let itemRepository;
  let mergeItem;
  beforeAll(async () => {
    itemMock = {
      author: 'Test author',
      title: 'Test title',
      price: 9.99,
      category: 'Test',
    };
    itemRepositoryReturnMock = new Item();
    idMock = 1;
    const module = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
      ],
    }).compile();

    itemService = module.get<ItemService>(ItemService);
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });
  describe('should be defined', () => {
    it('should be defined', () => {
      expect(itemService).toBeDefined();
      expect(itemService.create).toBeDefined();
      expect(itemService.getOne).toBeDefined();
      expect(itemService.get).toBeDefined();
      expect(itemService.update).toBeDefined();
      expect(itemService.remove).toBeDefined();
    });
  });
  describe('create', () => {
    it('should create and return Item', async () => {
      jest
        .spyOn(itemRepository, 'create')
        .mockResolvedValue(itemRepositoryReturnMock);
      jest
        .spyOn(itemRepository, 'save')
        .mockReturnValue(itemRepositoryReturnMock);

      const resoult = await itemService.create(itemMock);

      expect(itemRepository.create).toHaveBeenCalledWith(itemMock);
      expect(itemRepository.save).toHaveBeenCalledWith(
        itemRepositoryReturnMock,
      );
      expect(resoult).toEqual(itemRepositoryReturnMock);
    });
  });
  describe('getOne', () => {
    it('should findOneBy item', async () => {
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockResolvedValue(itemRepositoryReturnMock);

      const resoult = await itemService.getOne(idMock);

      expect(itemRepository.findOneBy).toHaveBeenCalledWith({ id: idMock });
      expect(resoult).toEqual(itemRepositoryReturnMock);
    });
    it('should findOneBy null', async () => {
      jest.spyOn(itemRepository, 'findOneBy').mockResolvedValue(null);

      await expect(itemService.getOne(idMock)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
  describe('get', () => {
    it('should findAllItem ', async () => {
      jest
        .spyOn(itemRepository, 'find')
        .mockResolvedValue(itemRepositoryReturnMock);

      const resoult = await itemService.get();

      expect(itemRepository.find).toHaveBeenCalledWith();
      expect(resoult).toEqual(itemRepositoryReturnMock);
    });
  });
  describe('update', () => {
    it('should update Item', async () => {
      mergeItem = {
        id: 1,
        author: 'Test author',
        title: 'Test title',
        price: 9.99,
        category: 'Test',
      };
      jest
        .spyOn(itemService, 'getOne')
        .mockResolvedValue(itemRepositoryReturnMock);
      jest.spyOn(itemRepository, 'merge').mockReturnValue(mergeItem);
      jest.spyOn(itemRepository, 'save').mockReturnValue(mergeItem);

      const resoult = await itemService.update(idMock, itemMock);

      expect(itemService.getOne).toHaveBeenCalledWith(idMock);
      expect(itemRepository.merge).toHaveBeenCalledWith(
        itemRepositoryReturnMock,
        itemMock,
      );
      expect(itemRepository.save).toHaveBeenCalledWith(mergeItem);
      expect(resoult).toEqual(mergeItem);
    });
  });
  describe('delete', () => {
    it('should delete Item', async () => {
      jest
        .spyOn(itemService, 'getOne')
        .mockResolvedValue(itemRepositoryReturnMock);
      jest
        .spyOn(itemRepository, 'remove')
        .mockResolvedValue(itemRepositoryReturnMock);

      const resoult = await itemService.remove(idMock);

      expect(itemService.getOne).toHaveBeenCalledWith(idMock);
      expect(itemRepository.remove).toHaveBeenCalledWith(
        itemRepositoryReturnMock,
      );
      expect(resoult).toEqual(itemRepositoryReturnMock);
    });
  });
});
