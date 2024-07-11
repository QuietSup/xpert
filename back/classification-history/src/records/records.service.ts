import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeException } from 'src/code.exception';
import { Record } from 'src/records/record.schema';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private readonly recordModel: Model<Record>,
  ) {}

  create(record: {
    userId: string;
    code: string;
    result: string;
    text: string;
  }) {
    const newRecord = new this.recordModel(record);
    return newRecord.save();
  }

  async getByUser(userId: string) {
    const record = await this.recordModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .exec();

    return record;
  }

  async deleteRecord(userId: string, recordId: string) {
    const record = await this.recordModel.findOne({ recordId });
    if (!record) {
      throw new CodeException(404, 'Record not found');
    }

    if (record.userId !== userId) {
      throw new CodeException(403, 'Forbidden');
    }

    await this.recordModel.deleteOne({ recordId }).exec();
    return record;
  }
}
