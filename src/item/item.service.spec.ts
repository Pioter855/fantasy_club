import { ItemService } from './item.service';
import { Item } from './item.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';
import { RatingService } from '../rating/rating.service';
import { createMock } from '@golevelup/ts-jest';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

describe('ItemService', () => {
  let itemService: ItemService;
  let itemMock;
  let itemRepositoryReturnMock;
  let idMock;
  let itemRepository: Repository<Item>;
  let mergeItem;
  let authorService: AuthorService;
  let categoryService: CategoryService;
  let ratingService: RatingService;
  let authorMock;
  let categoryMock;
  let mockDeleteMethodResponse;

  beforeAll(async () => {
    itemMock = {
      authorIds: [1],
      title: 'Test title',
      price: 9.99,
      categoryIds: [1],
    };

    itemRepositoryReturnMock = new Item();
    idMock = 1;
    authorMock = [
      {
        id: 1,
        firstName: 'piotr',
        lastName: 'Mazur',
        createAt: new Date(),
        updateAt: new Date(),
      },
    ];
    categoryMock = [
      {
        id: 1,
        name: 'Piotr',
        createAt: new Date(),
        updateAt: new Date(),
      },
    ];
    mockDeleteMethodResponse = {
      raw: [],
      affected: 1,
    };
    const module = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
        {
          provide: AuthorService,
          useFactory: () => createMock<AuthorService>(),
        },
        {
          provide: CategoryService,
          useFactory: () => createMock<CategoryService>(),
        },
        {
          provide: RatingService,
          useFactory: () => createMock<RatingService>(),
        },
      ],
    }).compile();

    ratingService = module.get<RatingService>(RatingService);
    categoryService = module.get<CategoryService>(CategoryService);
    authorService = module.get<AuthorService>(AuthorService);
    itemService = module.get<ItemService>(ItemService);
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });
  describe('should be defined', () => {
    it('should be defined', () => {
      expect(itemService).toBeDefined();
      expect(itemService.create).toBeDefined();
      expect(itemService.getAuthors).toBeDefined();
      expect(itemService.getCategories).toBeDefined();
      expect(itemService.rate).toBeDefined();
      expect(itemService.getItem).toBeDefined();
      expect(itemService.getOne).toBeDefined();
      expect(itemService.get).toBeDefined();
      expect(itemService.update).toBeDefined();
      expect(itemService.delete).toBeDefined();
    });
  });
  describe('create', () => {
    it('should create and return Item', async () => {
      jest
        .spyOn(itemRepository, 'save')
        .mockReturnValue(itemRepositoryReturnMock);
      jest.spyOn(itemService, 'getAuthors').mockResolvedValue(authorMock);
      jest.spyOn(itemService, 'getCategories').mockResolvedValue(categoryMock);

      const result = await itemService.create(itemMock, idMock);

      expect(itemService.getAuthors).toHaveBeenCalledWith(itemMock);
      expect(itemService.getCategories).toHaveBeenCalledWith(itemMock);
      expect(itemRepository.save).toHaveBeenCalledWith({
        ...itemMock,
        authors: authorMock,
        categories: categoryMock,
        user: { id: idMock },
      });
      expect(result).toBe(itemRepositoryReturnMock);
    });
  });

  describe('getOne', () => {
    it('should get item', async () => {
      jest
        .spyOn(itemRepository, 'findOneBy')
        .mockResolvedValue(itemRepositoryReturnMock);

      const result = await itemService.getOne(idMock);

      expect(itemRepository.findOneBy).toHaveBeenCalledWith({ id: idMock });
      expect(result).toEqual(itemRepositoryReturnMock);
    });
    it('should throw error when item dosent exist', async () => {
      jest.spyOn(itemRepository, 'findOneBy').mockResolvedValue(null);
      const result = itemService.getOne(idMock);

      await expect(result).rejects.toThrowError(NotFoundException);
    });
  });

  describe('get', () => {
    it('should get Item ', async () => {
      jest
        .spyOn(itemRepository, 'find')
        .mockResolvedValue([itemRepositoryReturnMock]);

      const result = await itemService.get();

      expect(itemRepository.find).toHaveBeenCalled();
      expect(result).toEqual([itemRepositoryReturnMock]);
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

      const result = await itemService.update(idMock, itemMock);

      expect(itemService.getOne).toHaveBeenCalledWith(idMock);
      expect(itemRepository.merge).toHaveBeenCalledWith(
        itemRepositoryReturnMock,
        itemMock,
      );
      expect(itemRepository.save).toHaveBeenCalledWith(mergeItem);
      expect(result).toEqual(mergeItem);
    });
  });

  describe('delete', () => {
    it('should delete Item', async () => {
      jest
        .spyOn(itemService, 'getOne')
        .mockResolvedValue(itemRepositoryReturnMock);
      jest
        .spyOn(itemRepository, 'delete')
        .mockReturnValue(mockDeleteMethodResponse);

      const result = await itemService.delete(idMock);

      expect(itemService.getOne).toHaveBeenCalledWith(idMock);
      expect(result).toEqual(mockDeleteMethodResponse);
    });
  });
});
