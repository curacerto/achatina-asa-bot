export class ItemMaximums {
  private readonly durability: number;
  private readonly armor: number;
  private readonly damage: number;
  private readonly rating: number;

  constructor(
    durability: number,
    armor: number,
    damage: number,
    rating: number,
  ) {
    this.durability = durability;
    this.armor = armor;
    this.damage = damage;
    this.rating = rating;
  }

  public getDurability(): number {
    return this.durability;
  }

  public getArmor(): number {
    return this.armor;
  }

  public getDamage(): number {
    return this.damage;
  }

  public getRating(): number {
    return this.rating;
  }
}
