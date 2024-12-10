import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

// Define Metadata Model
class Metadata extends Model {
  public id!: number;
  public title!: string;
  public startDateTime!: Date;
  public postalCode?: string;
  public filePath!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Metadata.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'metadata',
  }
);

export default Metadata;
