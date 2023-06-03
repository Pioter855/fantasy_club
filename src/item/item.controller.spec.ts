import { ItemService } from './item.service';
import { Item } from './item.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ItemController } from './item.controller';
import { createMock } from '@golevelup/ts-jest';

describe('ItemService', () => {
  let itemController: ItemController;
  let itemMock;
  let itemRepositoryReturnMock;
  let idMock;
  let mockItemService
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
        ItemController,
        {
          provide: ItemService,
          useFactory: ()=> createMock<ItemService>(),
        },
      ],
    }).compile();

    itemController = module.get<ItemController>(ItemController);
    mockItemService = module.get<ItemService>(ItemService)
  })
  describe('should be defined', () => {
    it('should be defined', () => {
      expect(itemController).toBeDefined();
      expect(itemController.create).toBeDefined();
      expect(itemController.getOne).toBeDefined();
      expect(itemController.get).toBeDefined();
      expect(itemController.update).toBeDefined();
      expect(itemController.delete).toBeDefined();
    });
  });

  describe('item controller create', ()=> {
    it('should itemService.create', async() => {
      await itemController.create(itemMock)
    })
  })
})