require("dotenv").config();
const mongoose = require("mongoose");
const dbURL = process.env.MONGODB_URL;
const MessageListService = require("../services/messageList-service");

const MessageList = require("../models/messageList-model");

describe("create", () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(dbURL, {
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(() => {});

  afterEach(() => {});

  it("should create new object and save it to db", async () => {
    const mockList = { title: "some-user-id" };
    await MessageListService.create(mockList);

    const insertedList = await MessageList.findOne({ title: "some-user-id" });
    await MessageList.findOneAndDelete({ title: "some-user-id" });

    expect(insertedList).toMatchObject({
      folderId: null,
      sys: expect.objectContaining({
        created: expect.any(Date),
        lastUpdated: expect.any(Date),
      }),
      messagesId: [],
      title: "some-user-id",
    });
  });

  it("should return null when creating new list with duplicating title and folderId", async () => {
    const mockList = { title: "test", folderId: "619aaaf99cd973869e2d764f" };

    await MessageListService.create(mockList);

    // const result = async () => await MessageListService.create(mockList);

    // await MessageList.findOneAndDelete({ title: "test" });

    expect(async () => {
      await MessageListService.create(mockList);
    }).toThrow(TypeError);
  });

  it("should return null when creating new list with duplicating title without folderId", async () => {
    const mockList = { title: "test", folderId: null };

    await MessageListService.create(mockList);
    const result = await MessageListService.create(mockList);
    await MessageList.findOneAndDelete({ title: "test" });

    expect(result).toThrow(TypeError);
  });

  it(
    "should return list when creating new list without folderId" +
      " and there exists a list with folderId and same title",
    async () => {
      const mockListNoFolderId = { title: "No folder id", folderId: null };
      const mockListWithFolderId = {
        title: "With folder id",
        folderId: "619aaaf99cd973869e2d764f",
      };

      await MessageListService.create(mockListWithFolderId);
      const result = await MessageListService.create(mockListNoFolderId);
      await MessageList.findOneAndDelete({ title: "No folder id" });
      await MessageList.findOneAndDelete({ title: "With folder id" });

      expect(result).toMatchObject({
        folderId: null,
        sys: expect.objectContaining({
          created: expect.any(Date),
          lastUpdated: expect.any(Date),
        }),
        messagesId: [],
        title: "No folder id",
      });
    },
  );

  it("on update should return object with updated fields and lastUpdated field", async () => {
    const newList = await MessageListService.create({ title: "Test title" });

    const updates = {
      sys: newList.sys,
      folderId: newList.folderId,
      title: "Updated list",
      messagesId: [3, 4],
      id: newList._id,
    };

    const oldtime = parseInt((newList.sys.lastUpdated.getTime() / 1000).toFixed(0));
    jest.setTimeout(3000);
    const updatedList = await MessageListService.update(updates);
    await MessageList.findOneAndDelete({ _id: newList._id });

    const newTime = parseInt((updatedList.sys.lastUpdated.getTime() / 1000).toFixed(0));

    expect(oldtime).toBeLessThan(newTime);
  });
});
