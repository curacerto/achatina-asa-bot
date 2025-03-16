import { Injectable } from '@nestjs/common';
import { ItemMaximums } from './item-maximums';
import { ArmorMaximumsEnumerator } from './constant/armor-maximums.enumerator';
import * as seedrandom from 'seedrandom';
import { ItemCategoryEnumerator } from './constant/item-category.enumerator';

@Injectable()
export class ItemMaximumsService {
  private readonly maxRating: number = 2000;
  private readonly minRating: number = 1000;
  private readonly maxDamage: number = 755;
  private readonly minDamage: number = 100;
  private readonly maxDurabilityDefault: number = 2000;
  private readonly minDurabilityDefault: number = 500;
  private readonly minArmorDefault: number = 500;

  constructor() {
    const seed = Date.now();
    seedrandom(seed.toString(), { global: true });
  }

  public getItemMaximums(category: string, name: string): ItemMaximums {
    let itemMaximums = new ItemMaximums(
      this.minDurabilityDefault,
      this.minArmorDefault,
      this.minDamage,
      this.maxRating,
    );
    if (category === ItemCategoryEnumerator.ARMOR) {
      if (name.includes('flak')) {
        itemMaximums = new ItemMaximums(
          ArmorMaximumsEnumerator.maximums.FLAK.durability,
          ArmorMaximumsEnumerator.maximums.FLAK.armor,
          0,
          this.maxRating,
        );
      }
      if (name.includes('hazard')) {
        itemMaximums = new ItemMaximums(
          ArmorMaximumsEnumerator.maximums.HAZARD_SUIT.durability,
          ArmorMaximumsEnumerator.maximums.HAZARD_SUIT.armor,
          0,
          this.maxRating,
        );
      }
      if (name.includes('tek')) {
        itemMaximums = new ItemMaximums(
          ArmorMaximumsEnumerator.maximums.TEK.durability,
          ArmorMaximumsEnumerator.maximums.TEK.armor,
          0,
          this.maxRating,
        );
      }
      if (name.includes('riot')) {
        itemMaximums = new ItemMaximums(
          ArmorMaximumsEnumerator.maximums.RIOT.durability,
          ArmorMaximumsEnumerator.maximums.RIOT.armor,
          0,
          this.maxRating,
        );
      }
      if (name.includes('scuba')) {
        itemMaximums = new ItemMaximums(
          ArmorMaximumsEnumerator.maximums.SCUBA.durability,
          ArmorMaximumsEnumerator.maximums.SCUBA.armor,
          0,
          this.maxRating,
        );
      }
      if (name.includes('gas')) {
        itemMaximums = new ItemMaximums(
          ArmorMaximumsEnumerator.maximums.GAS.durability,
          ArmorMaximumsEnumerator.maximums.GAS.armor,
          0,
          this.maxRating,
        );
      }
    }
    if (
      category === ItemCategoryEnumerator.WEAPON ||
      category === ItemCategoryEnumerator.TOOL
    ) {
      itemMaximums = new ItemMaximums(
        this.maxDurabilityDefault,
        0,
        this.maxDamage,
        this.maxRating,
      );
    }
    return itemMaximums;
  }

  public getRandomDurability(itemMaximums: ItemMaximums): number {
    if (itemMaximums.getDurability() === 0) {
      return 0;
    }
    if (itemMaximums.getDurability() <= this.minDurabilityDefault) {
      return this.minDurabilityDefault;
    }
    return (
      Math.random() *
        (itemMaximums.getDurability() - this.minDurabilityDefault) +
      this.minDurabilityDefault
    );
  }

  public getRandomArmor(itemMaximums: ItemMaximums): number {
    if (itemMaximums.getArmor() === 0) {
      return 0;
    }
    if (itemMaximums.getArmor() <= this.minArmorDefault) {
      return this.minArmorDefault;
    }
    return (
      Math.random() * (itemMaximums.getArmor() - this.minArmorDefault) +
      this.minArmorDefault
    );
  }

  public getRandomRating(itemMaximums: ItemMaximums): number {
    return (
      Math.random() * (itemMaximums.getRating() - this.minRating) +
      this.minRating
    );
  }

  public getRandomDamage(itemMaximums: ItemMaximums): number {
    if (itemMaximums.getDamage() === 0) {
      return 0;
    }
    if (itemMaximums.getDamage() <= this.minDamage) {
      return this.minDamage;
    }
    return (
      Math.random() * (itemMaximums.getDamage() - this.minDamage) +
      this.minDamage
    );
  }
}
