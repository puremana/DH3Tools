function permutateArray(arr, n) {
	const liftA2 = (f, a, b) => listApply(a.map(curry(f)), b);
	const replicateM = (n, f) => {
		const loop = x => x <= 0 ? [ [] ] : liftA2(cons, f, loop(x - 1));
		return loop(n);
	};
	const listApply = (fs, xs) =>
		[].concat.apply([], fs.map(f =>
			[].concat.apply([], xs.map(x => [f(x)]))));
	const curry = f => a => b => f(a, b);
	const cons = (x, xs) => [x].concat(xs);
	return replicateM(n, arr);
}

const app = new Vue({
	el: "#app",
	data: {
		updates: [
			{
				date: moment("2020-07-05").format("LL"),
				content: [
					"Added this change log.",
					"Added \"base cost on\" dropdown to farming and brewing pages. This allows you to base the cost estimates on either the minimum market value or the average. I was going to wait for the market API to be released to change the market page, but I got a request to add this so I did. Enjoy!",
					"Added a Mining Optimizer tool to the \"Mining Rates\" page. It's still experimental. I haven't done a whole lot of testing on it, but it seems pretty accurate. I would welcome some feedback on it."
				]
			}
		],
		sph: 3600,
		spd: 86400,
		tab: "updates",
		donorBonus: false,
		stardust: 0,
		oilIncome: 0,
		mana: 0,
		brewingCostBase: "min",
		farmingCostBase: "min",
		market: {
			time: null,
			items: []
		},
		miningRateOptimizer: {
			optimizeFor: "coins",
			busy: false,
			result: [],
			ores: {
				stone: {
					key: "stone",
					include: true,
					coins: 0,
					targetAmount: 0
				},
				copper: {
					key: "copper",
					include: true,
					coins: 0,
					targetAmount: 0
				},
				iron: {
					key: "iron",
					include: true,
					coins: 0,
					targetAmount: 0
				},
				silver: {
					key: "silver",
					include: true,
					coins: 0,
					targetAmount: 0
				},
				gold: {
					key: "gold",
					include: true,
					coins: 0,
					targetAmount: 0
				},
				promethium: {
					key: "promethium",
					include: true,
					coins: 0,
					targetAmount: 0
				}
			}
		},
		seeds: {
			redMushroomSeeds: {
				key: "redMushroomSeeds",
				name: "Red Mushroom",
				level: 1,
				xp: 25,
				bonemeal: 0,
				image: "images/redMushroomSeeds.png"
			},
			stardustSeeds: {
				key: "stardustSeeds",
				name: "Stardust",
				level: 15,
				xp: 50,
				bonemeal: 5,
				image: "images/stardustSeeds.png"
			},
			dottedGreenLeafSeeds: {
				key: "dottedGreenLeafSeeds",
				name: "Dotted Green Leaf",
				level: 1,
				xp: 250,
				bonemeal: 0,
				image: "images/dottedGreenLeafSeeds.png"
			},
			greenLeafSeeds: {
				key: "greenLeafSeeds",
				name: "Green Leaf",
				level: 10,
				xp: 500,
				bonemeal: 0,
				image: "images/dottedGreenLeafSeeds.png"
			},
			limeLeafSeeds: {
				key: "limeLeafSeeds",
				name: "Lime Leaf",
				level: 30,
				xp: 1000,
				bonemeal: 0,
				image: "images/limeLeafSeeds.png"
			},
			goldLeafSeeds: {
				key: "goldLeafSeeds",
				name: "Gold Leaf",
				level: 45,
				xp: 3000,
				bonemeal: 20,
				image: "images/goldLeafSeeds.png"
			},
			crystalLeafSeeds: {
				key: "crystalLeafSeeds",
				name: "Crystal Leaf",
				level: 70,
				xp: 8000,
				bonemeal: 50,
				image: "images/crystalLeafSeeds.png"
			},
			stripedGoldLeafSeeds: {
				key: "stripedGoldLeafSeeds",
				name: "Striped Gold Leaf",
				level: 80,
				xp: 20000,
				bonemeal: 120,
				image: "images/stripedGoldLeafSeeds.png"
			},
			stripedCrystalLeafSeeds: {
				key: "stripedCrystalLeafSeeds",
				name: "Striped Crystal Leaf",
				level: 90,
				xp: 40000,
				bonemeal: 200,
				image: "images/stripedCrystalLeafSeeds.png"
			},
			treeSeeds: {
				key: "treeSeeds",
				name: "Tree",
				level: 10,
				xp: 2000,
				bonemeal: 0,
				image: "images/treeSeeds.png"
			},
			oakTreeSeeds: {
				key: "oakTreeSeeds",
				name: "Oak Tree",
				level: 25,
				xp: 3500,
				bonemeal: 5,
				image: "images/oakTreeSeeds.png"
			},
			willowTreeSeeds: {
				key: "willowTreeSeeds",
				name: "Willow Tree",
				level: 40,
				xp: 5000,
				bonemeal: 10,
				image: "images/willowTreeSeeds.png"
			},
			bambooTreeSeeds: {
				key: "bambooTreeSeeds",
				name: "Bamboo Tree",
				level: 50,
				xp: 7000,
				bonemeal: 20,
				image: "images/bambooTreeSeeds.png"
			},
			mapleTreeSeeds: {
				key: "mapleTreeSeeds",
				name: "Maple Tree",
				level: 60,
				xp: 12000,
				bonemeal: 50,
				image: "images/mapleTreeSeeds.png"
			},
			stardustTreeSeeds: {
				key: "stardustTreeSeeds",
				name: "Stardust Tree",
				level: 80,
				xp: 30000,
				bonemeal: 100,
				image: "images/stardustTreeSeeds.png"
			}
		},
		zones: {
			fields: {
				key: "fields",
				name: "Fields",
				energy: 50,
				cooldown: 15,
				monsters: {
					chicken: {
						key: "chicken",
						name: "Chicken",
						image: "images/chicken_monster_idle_0.png",
						health: 10,
						attack: 1,
						accuracy: 0,
						speed: 3,
						defence: 0,
						xp: 25
					},
					rat: {
						key: "rat",
						name: "Rat",
						image: "images/rat_monster_idle_0.png",
						health: 5,
						attack: 1,
						accuracy: 0,
						speed: 4,
						defence: 0,
						xp: 30
					},
					bee: {
						key: "bee",
						name: "Bee",
						image: "images/bee_monster_idle_0.png",
						health: 3,
						attack: 1,
						accuracy: 1,
						speed: 4,
						defence: 0,
						xp: 35
					}
				}
			},
			forest: {
				key: "forest",
				name: "Forest",
				energy: 200,
				cooldown: 30,
				monsters: {
					snake: {
						key: "snake",
						name: "Snake",
						image: "images/snake_monster_idle_0.png",
						health: 15,
						attack: 1,
						accuracy: 1,
						speed: 3,
						defence: 0,
						xp: 55
					},
					ent: {
						key: "ent",
						name: "Ent",
						image: "images/ent_monster_idle_0.png",
						health: 30,
						attack: 1,
						accuracy: 1,
						speed: 2,
						defence: 1,
						xp: 70
					},
					thief: {
						key: "thief",
						name: "Thief",
						image: "images/thief_monster_idle_0.png",
						health: 25,
						attack: 2,
						accuracy: 1,
						speed: 4,
						defence: 0,
						xp: 50
					}
				}
			},
			caves: {
				key: "caves",
				name: "Caves",
				energy: 500,
				cooldown: 60,
				monsters: {
					bear: {
						key: "bear",
						name: "Bear",
						image: "images/bear_monster_idle_0.png",
						health: 45,
						attack: 2,
						accuracy: 3,
						speed: 3,
						defence: 0,
						xp: 150
					},
					spider: {
						key: "spider",
						name: "Spider",
						image: "images/spider_monster_idle_0.png",
						health: 20,
						attack: 0,
						accuracy: 0,
						speed: 3,
						defence: 0,
						xp: 190
					},
					skeleton: {
						key: "skeleton",
						name: "Skeleton",
						image: "images/skeleton_monster_idle_0.png",
						health: 15,
						attack: 3,
						accuracy: 5,
						speed: 3,
						defence: 8,
						xp: 220
					}
				}
			},
			lavaDungeon: {
				key: "lavaDungeon",
				name: "Lava Dungeon",
				energy: 2000,
				cooldown: 90,
				monsters: {
					lavaAlien: {
						key: "lavaAlien",
						name: "Lava Alien",
						image: "images/lavaAlien_monster_idle_0.png",
						health: 75,
						attack: 5,
						accuracy: 7,
						speed: 3,
						defence: 0,
						xp: 350
					},
					bat: {
						key: "bat",
						name: "Bat",
						image: "images/bat_monster_idle_0.png",
						health: 50,
						attack: 5,
						accuracy: 7,
						speed: 4,
						defence: 0,
						xp: 350
					},
					fireMage: {
						key: "fireMage",
						name: "Fire Mage",
						image: "images/fireMage_monster_idle_0.png",
						health: 20,
						attack: 0,
						accuracy: 0,
						speed: 3,
						defence: 0,
						xp: 500
					}
				}
			},
			northernFields: {
				key: "northernFields",
				name: "Northern Fields",
				energy: 5000,
				cooldown: 120,
				monsters: {
					boneHead: {
						key: "boneHead",
						name: "Bonehead",
						image: "images/boneHead_monster_idle_0.png",
						health: 60,
						attack: 15,
						accuracy: 6,
						speed: 3,
						defence: 5,
						xp: 680
					},
					mammaPolarBear: {
						key: "mammaPolarBear",
						name: "Mamma Polar Bear",
						image: "images/mammaPolarBear_monster_idle_0.png",
						health: 100,
						attack: 3,
						accuracy: 8,
						speed: 3,
						defence: 5,
						xp: 700
					},
					yeti: {
						key: "yeti",
						name: "Yeti",
						image: "images/yeti_monster_awake_0.png",
						health: 150,
						attack: 0,
						accuracy: 0,
						speed: 3,
						defence: 5,
						xp: '?'
					}
				}
			}
		},
		items: {
			dottedGreenLeaf: {
				key: "dottedGreenLeaf",
				name: "Dotted Green Leaf",
				image: "images/dottedGreenLeafBigDots.png",
				amount: 0,
				brewingIngredient: true,
				isLeaf: true
			},
			greenLeaf: {
				key: "greenLeaf",
				name: "Green Leaf",
				image: "images/greenLeaf.png",
				amount: 0,
				brewingIngredient: true,
				isLeaf: true
			},
			limeLeaf: {
				key: "limeLeaf",
				name: "Lime Leaf",
				image: "images/limeLeaf.png",
				amount: 0,
				brewingIngredient: true,
				isLeaf: true
			},
			goldLeaf: {
				key: "goldLeaf",
				name: "Gold Leaf",
				image: "images/goldLeaf.png",
				amount: 0,
				brewingIngredient: true,
				isLeaf: true
			},
			bronzeBar: {
				key: "bronzeBar",
				name: "Bronze Bar",
				image: "images/bronzeBars.png",
				amount: 0,
				brewingIngredient: true
			},
			ironBar: {
				key: "ironBar",
				name: "Iron Bar",
				image: "images/ironBars.png",
				amount: 0,
				brewingIngredient: true
			},
			silverBar: {
				key: "silverBar",
				name: "Silver Bar",
				image: "images/silverBars.png",
				amount: 0,
				brewingIngredient: true
			},
			goldBar: {
				key: "goldBar",
				name: "Gold Bar",
				image: "images/goldBars.png",
				amount: 0,
				brewingIngredient: true
			},
			promethiumBar: {
				key: "promethiumBar",
				name: "Promethium Bar",
				image: "images/promethiumBars.png",
				amount: 0
			},
			strangeLeaf: {
				key: "strangeLeaf",
				name: "Strange Leaf",
				image: "images/strangeLeaf.png",
				amount: 0,
				brewingIngredient: true,
				isLeaf: true
			},
			redMushroom: {
				key: "redMushroom",
				name: "Red Mushroom",
				image: "images/redMushroom.png",
				amount: 0,
				brewingIngredient: true
			},
			bones: {
				key: "bones",
				name: "Bones",
				image: "images/bones.png",
				amount: 0,
				brewingIngredient: true
			},
			oil: {
				key: "oil",
				name: "Oil",
				image: "images/oil.png",
				amount: 0,
				brewingIngredient: true
			},
			logs: {
				key: "logs",
				name: "Logs",
				image: "images/logs.png",
				amount: 0,
				brewingIngredient: true
			},
			vial: {
				key: "vial",
				name: "Vial",
				image: "images/smallVial.png",
				amount: 0,
				brewingIngredient: true
			},
			largeVial: {
				key: "largeVial",
				name: "Large Vial",
				image: "images/largeVial.png",
				amount: 0,
				brewingIngredient: true
			}
		},
		potions: {
			stardustPotion: {
				key: "stardustPotion",
				name: "Stardust Potion",
				image: "images/stardustPotion.png",
				level: 1,
				xp: 50,
				ingredients: {
					vial: 1,
					dottedGreenLeaf: 1,
					redMushroom: 15
				}
			},
			sandPotion: {
				key: "sandPotion",
				name: "Sand Potion",
				image: "images/sandPotion.png",
				level: 3,
				xp: 80,
				ingredients: {
					vial: 1,
					dottedGreenLeaf: 2,
					redMushroom: 20
				}
			},
			cookingBoostPotion: {
				key: "cookingBoostPotion",
				name: "Cooking Boost Potion",
				image: "images/cookingBoostPotion.png",
				level: 5,
				xp: 70,
				ingredients: {
					vial: 1,
					greenLeaf: 1,
					redMushroom: 10
				}
			},
			combatCooldownPotion: {
				key: "combatCooldownPotion",
				name: "Combat Cooldown",
				image: "images/combatCooldownPotion.png",
				level: 8,
				xp: 210,
				ingredients: {
					vial: 1,
					dottedGreenLeaf: 3,
					greenLeaf: 3,
					bones: 5
				}
			},
			compostPotion: {
				key: "compostPotion",
				name: "Compost Potion",
				image: "images/compostPotion.png",
				level: 10,
				xp: 140,
				ingredients: {
					vial: 1,
					greenLeaf: 2,
					redMushroom: 20
				}
			},
			oilPotion: {
				key: "oilPotion",
				name: "Oil Potion",
				image: "images/oilPotion.png",
				level: 13,
				xp: 80,
				ingredients: {
					vial: 1,
					dottedGreenLeaf: 4,
					oil: 1
				}
			},
			bonePotion: {
				key: "bonePotion",
				name: "Bone Potion",
				image: "images/bonePotion.png",
				level: 15,
				xp: 100,
				ingredients: {
					vial: 1,
					dottedGreenLeaf: 5,
					bones: 20
				}
			},
			treeStarterPotion: {
				key: "treeStarterPotion",
				name: "Tree Starter Potion",
				image: "images/treeStarterPotion.png",
				level: 18,
				xp: 160,
				ingredients: {
					vial: 1,
					dottedGreenLeaf: 3,
					redMushroom: 50,
					logs: 1
				}
			},
			barPotion: {
				key: "barPotion",
				name: "Bar Potion",
				image: "images/barPotion.png",
				level: 22,
				xp: 600,
				ingredients: {
					vial: 1,
					greenLeaf: 2,
					limeLeaf: 2,
					bronzeBar: 1,
					ironBar: 1,
					silverBar: 1,
					goldBar: 1
				}
			},
			sapphireStardustPotion: {
				key: "sapphireStardustPotion",
				name: "Sapphire Stardust Potion",
				image: "images/sapphireStardustPotion.png",
				level: 25,
				xp: 450,
				ingredients: {
					vial: 1,
					limeLeaf: 1,
					redMushroom: 100
				}
			},
			manaPotion: {
				key: "manaPotion",
				name: "Mana Potion",
				image: "images/largeManaPotion.png",
				level: 30,
				xp: '?',
				ingredients: {
					largeVial: 1,
					strangeLeaf: 5
				}
			}
		},
		machines: {
			miner: {
				key: "miner",
				name: "Miner",
				ore: "none",
				image: "images/miner.gif"
			},
			drill1: {
				key: "drill1",
				name: "Drill 1",
				ore: "none",
				image: "images/drills.gif"
			},
			drill2: {
				key: "drill2",
				name: "Drill 2",
				ore: "none",
				image: "images/drills.gif"
			},
			drill3: {
				key: "drill3",
				name: "Drill 3",
				ore: "none",
				image: "images/drills.gif"
			},
			crusher1: {
				key: "crusher1",
				name: "Crusher 1",
				ore: "none",
				image: "images/crushers.gif"
			},
			crusher2: {
				key: "crusher2",
				name: "Crusher 2",
				ore: "none",
				image: "images/crushers.gif"
			},
			crusher3: {
				key: "crusher3",
				name: "Crusher 3",
				ore: "none",
				image: "images/crushers.gif"
			}
		},
		bars: {
			none: {
				key: "none",
				name: "None"
			},
			bronze: {
				key: "bronze",
				name: "Bronze",
				image: "images/bronzeBars.png",
				bgClass: "dh3-bg-copper",
				xp: 10
			},
			iron: {
				key: "iron",
				name: "Iron",
				image: "images/ironBars.png",
				bgClass: "dh3-bg-iron",
				xp: 90
			},
			silver: {
				key: "silver",
				name: "Silver",
				image: "images/silverBars.png",
				bgClass: "dh3-bg-silver",
				xp: 150
			},
			gold: {
				key: "gold",
				name: "Gold",
				image: "images/goldBars.png",
				bgClass: "dh3-bg-gold",
				xp: 300
			},
			promethium: {
				key: "promethium",
				name: "Promethium",
				image: "images/promethiumBars.png",
				bgClass: "dh3-bg-promethium",
				xp: '?'
			}
		},
		ores: {
			none: {
				key: "none",
				name: "None"
			},
			stone: {
				key: "stone",
				name: "Stone",
				image: "images/stone.png",
				bgClass: "dh3-bg-stone",
				tickChanceMiner: 1/14,
				tickChanceDrill: 1/11,
				tickChanceCrusher: 1/8,
				sellsFor: 1,
				xp: 0.1,
				bar: null
			},
			copper: {
				key: "copper",
				name: "Copper",
				image: "images/copper.png",
				bgClass: "dh3-bg-copper",
				tickChanceMiner: 1/49,
				tickChanceDrill: 1/29,
				tickChanceCrusher: 1/20,
				sellsFor: 2,
				xp: 1,
				bar: "bronze"
			},
			iron: {
				key: "iron",
				name: "Iron",
				image: "images/iron.png",
				bgClass: "dh3-bg-iron",
				tickChanceMiner: 1/500,
				tickChanceDrill: 1/250,
				tickChanceCrusher: 1/150,
				sellsFor: 3,
				xp: 5,
				bar: "iron"
			},
			silver: {
				key: "silver",
				name: "Silver",
				image: "images/silver.png",
				bgClass: "dh3-bg-silver",
				tickChanceMiner: 1/3000,
				tickChanceDrill: 1/1000,
				tickChanceCrusher: 1/750,
				sellsFor: 5,
				xp: 10,
				bar: "silver"
			},
			gold: {
				key: "gold",
				name: "Gold",
				image: "images/gold.png",
				bgClass: "dh3-bg-gold",
				tickChanceMiner: 1/20000,
				tickChanceDrill: 1/8000,
				tickChanceCrusher: 1/4000,
				sellsFor: 10,
				xp: 25,
				bar: "gold"
			},
			promethium: {
				key: "promethium",
				name: "Promethium",
				image: "images/promethium.png",
				bgClass: "dh3-bg-promethium",
				tickChanceMiner: 1/100000,
				tickChanceDrill: 1/70000,
				tickChanceCrusher: 1/50000,
				sellsFor: '?',
				xp: '?',
				bar: "promethium"
			}
		},
		gems: {
			none: {
				key: "none",
				name: "None",
				image: null,
				sdxp: 17
			},
			sapphire: {
				key: "sapphire",
				name: "Sapphire",
				image: "images/sapphire.png",
				sdxp: 16
			},
			emerald: {
				key: "emerald",
				name: "Emerald",
				image: "images/emerald.png",
				sdxp: 15
			},
			ruby: {
				key: "ruby",
				name: "Ruby",
				image: "images/ruby.png",
				sdxp: 14
			},
			diamond: {
				key: "diamond",
				name: "Diamond",
				image: "images/diamond.png",
				sdxp: 12
			}
		},
		skills: {
			combat: {
				key: "combat",
				name: "Combat",
				image: "images/combatSkill.png",
				xp: 0,
				targetLevel: 0
			},
			magic: {
				key: "magic",
				name: "Magic",
				image: "images/magicSkill.png",
				xp: 0,
				targetLevel: 0
			},
			mining: {
				key: "mining",
				name: "Mining",
				image: "images/miningSkill.png",
				xp: 0,
				targetLevel: 0
			},
			crafting: {
				key: "crafting",
				name: "Crafting",
				image: "images/craftingSkill.png",
				xp: 0,
				targetLevel: 0
			},
			woodcutting: {
				key: "woodcutting",
				name: "Woodcutting",
				image: "images/woodcuttingSkill.png",
				xp: 0,
				targetLevel: 0
			},
			farming: {
				key: "farming",
				name: "Farming",
				image: "images/farmingSkill.png",
				xp: 0,
				targetLevel: 0
			},
			brewing: {
				key: "brewing",
				name: "Brewing",
				image: "images/brewingSkill.png",
				xp: 0,
				targetLevel: 0
			},
			fishing: {
				key: "fishing",
				name: "Fishing",
				image: "images/fishingSkill.png",
				xp: 0,
				targetLevel: 0
			},
			cooking: {
				key: "cooking",
				name: "Cooking",
				image: "images/cookingSkill.png",
				xp: 0,
				targetLevel: 0
			}
		},
		tools: {
			pickaxe: {
				key: "pickaxe",
				name: "Pickaxe",
				image: "images/pickaxe.png",
				gem: "none"
			},
			shovel: {
				key: "shovel",
				name: "Shovel",
				image: "images/shovel.png",
				gem: "none"
			},
			hammer: {
				key: "hammer",
				name: "Hammer",
				image: "images/hammer.png",
				gem: "none"
			},
			axe: {
				key: "axe",
				name: "Axe",
				image: "images/axe.png",
				gem: "none"
			},
			rake: {
				key: "rake",
				name: "Rake",
				image: "images/rake.png",
				gem: "none"
			},
			bonemealBin: {
				key: "bonemealBin",
				name: "Bonemeal Bin",
				image: "images/bonemealBin.png",
				gem: "none"
			},
			brewingKit: {
				key: "brewingKit",
				name: "Brewing Kit",
				image: "images/brewingKit.png",
				gem: "none"
			},
			smallNet: {
				key: "smallNet",
				name: "Small Net",
				image: "images/smallNet.png",
				gem: "none"
			},
			fishingRod: {
				key: "fishingRod",
				name: "Fishing Rod",
				image: "images/fishingRod.png",
				gem: "none"
			},
			harpoon: {
				key: "harpoon",
				name: "Harpoon",
				image: "images/harpoon.png",
				gem: "none"
			}
		},
		levels: function(){
			let result = [];
			result[1] = 0;
			for(let lv = 2; lv <= 100; lv++) {
				result[lv] = Math.ceil(Math.pow(lv, 3+(lv/200)));
			}
			return result;
		}()
	},
	computed: {
		miningRateOptimizerForceDisabled() {
			let optimizeFor = this.miningRateOptimizer.optimizeFor;
			let result = {};
			Object.values(this.ores).forEach(function(ore) {
				switch(optimizeFor) {
					case "coins": {
						//result[ore.key] = ["promethium"].includes(ore.key);
						break;
					}
					case "ores": {
						break;
					}
					case "mining": {
						result[ore.key] = ["promethium"].includes(ore.key);
						break;
					}
					case "crafting": {
						result[ore.key] = ["promethium", "stone"].includes(ore.key);
						break;
					}
				}
			});
			return result;
		},
		leavesPerPotion() {
			const self = this;
			let result = {};
			Object.values(self.potions).forEach(function(potion) {
				let leaves = 0;
				Object.keys(potion.ingredients).forEach(function(item) {
					if(self.items[item].isLeaf) {
						leaves += potion.ingredients[item];
					}
				});
				result[potion.key] = leaves;
			});
			return result;
		},
		potionCosts() {
			const self = this;
			let result = {};
			Object.values(self.potions).forEach(function(potion) {
				let cost = 0;
				Object.keys(potion.ingredients).forEach(function(item) {
					let marketItem = self.market.items[item];
					if(marketItem) {
						if(self.brewingCostBase=='avg') {
							cost += marketItem.average * potion.ingredients[item];
						}
						else if(self.brewingCostBase=='min') {
							cost += marketItem.min * potion.ingredients[item];
						}
					}
				});
				result[potion.key] = Math.ceil(cost);
			});
			return result;
		},
		brewable() {
			const self = this;
			let result = {};
			Object.values(self.potions).forEach(function(potion) {
				let min = 9999999;
				Object.keys(potion.ingredients).forEach(function(item) {
					let have = self.items[item].amount;
					let need = potion.ingredients[item];
					let brewable = Math.floor(have/need);
					if(brewable < min) {
						min = brewable;
					}
				});
				result[potion.key] = min;
			});
			return result;
		},
		miningRates() {
			const self = this;
			let result = {};
			Object.values(this.ores).forEach(function(ore) {
				if(ore.key=="none") {
					return;
				}
				let perTick = 0;
				if(self.machines.miner.ore==ore.key) {
					perTick += ore.tickChanceMiner;
				}
				if(self.machines.drill1.ore==ore.key) {
					perTick += ore.tickChanceDrill;
				}
				if(self.machines.drill2.ore==ore.key) {
					perTick += ore.tickChanceDrill;
				}
				if(self.machines.drill3.ore==ore.key) {
					perTick += ore.tickChanceDrill;
				}
				if(self.machines.crusher1.ore==ore.key) {
					perTick += ore.tickChanceCrusher;
				}
				if(self.machines.crusher2.ore==ore.key) {
					perTick += ore.tickChanceCrusher;
				}
				if(self.machines.crusher3.ore==ore.key) {
					perTick += ore.tickChanceCrusher;
				}
				result[ore.key] = perTick;
			});
			let oilPerTick = 0;
			if(self.machines.drill1.ore!="none") {
				oilPerTick += 1;
			}
			if(self.machines.drill2.ore!="none") {
				oilPerTick += 1;
			}
			if(self.machines.drill3.ore!="none") {
				oilPerTick += 1;
			}
			if(self.machines.crusher1.ore!="none") {
				oilPerTick += 3;
			}
			if(self.machines.crusher2.ore!="none") {
				oilPerTick += 3;
			}
			if(self.machines.crusher3.ore!="none") {
				oilPerTick += 3;
			}
			result["oil"] = oilPerTick;
			return result;
		},
		zoneAverageXP() {
			let result = {};
			Object.values(this.zones).forEach(function(zone) {
				let n = 0;
				let total = 0;
				Object.values(zone.monsters).forEach(function(mon) {
					if(typeof mon.xp === "number") {
						n++;
						total += mon.xp;
					}
				});
				result[zone.key] = n==0 ? 0 : total/n;
			});
			return result;
		},
		xpMultiplier() {
			return this.donorBonus ? 1.1 : 1.0;
		},
		skillLevels() {
			const self = this;
			let levels = {};
			Object.keys(self.skills).forEach(function(key) {
				levels[key] = self.xpToLevel(self.skills[key].xp);
			});
			return levels;
		},
		skillNext() {
			const self = this;
			let next = {};
			Object.keys(self.skills).forEach(function(key) {
				let lv = self.skillLevels[key];
				if(lv>=100) {
					next[key] = 0;
				}
				else {
					let nextXP = self.levels[lv+1];
					next[key] = nextXP - self.skills[key].xp;
				}
			});
			return next;
		},
		skillUntilTarget() {
			const self = this;
			let target = {};
			Object.keys(self.skills).forEach(function(key) {
				let lv = self.skillLevels[key];
				let targetLevel = self.skills[key].targetLevel;
				if(targetLevel>100) {
					self.skills[key].targetLevel = 100;
					targetLevel = 100;
				}
				if(targetLevel <= lv) {
					target[key] = 0;
					return;
				}
				if(lv>=100) {
					target[key] = 0;
					return;
				}
				let targetXP = self.levels[targetLevel];
				target[key] = targetXP - self.skills[key].xp;
			});
			return target;
		}
	},
	methods: {
		setTab(tab) {
			this.tab = tab;
			window.location.hash = tab;
		},
		commafy(n) {
			n = n.toString();
			let parts = n.split(".");
			let left = parts[0];
			let right = "";
			if(parts.length>1) {
				right = parts[1];
			}
			let pattern = /(\d+)(\d{3})/;
			while(pattern.test(left)) {
				left = left.replace(pattern, "$1,$2");
			}
			if(right) {
				return left+"."+right;
			}
			else {
				return left;
			}
		},
		xpToLevel(xp) {
			if(xp <= 0) {
				return 1;
			}
			if(xp >= this.levels[100]) {
				return 100;
			}
			let lower = 1;
			let upper = 100;
			while(lower <= upper) {
				let mid = Math.floor((lower + upper) / 2);
				midXP = this.levels[mid];
				midPlus1XP = this.levels[mid+1];
				if(xp < midXP) {
					upper = mid;
					continue;
				}
				if(xp > midPlus1XP) {
					lower=mid+1;
					continue;
				}
				if(mid<100 && xp == this.levels[mid+1]) {
					return mid+1;
				}
				return mid;
			}
		},
		saveCookie() {
			const self = this;
			let cookie = {
				xp: {},
				targetLevels: {},
				gems: {},
				machines: {},
				inventory: {},
				miningRateOptimizer: {ores:{}},
				oilIncome: self.oilIncome,
				mana: self.mana,
				stardust: self.stardust,
				donorBonus: self.donorBonus
			};
			Object.values(self.skills).forEach(function(skill) {
				cookie.xp[skill.key] = skill.xp;
				cookie.targetLevels[skill.key] = skill.targetLevel;
			});
			Object.values(self.tools).forEach(function(tool) {
				cookie.gems[tool.key] = tool.gem;
			});
			Object.values(self.machines).forEach(function(machine) {
				cookie.machines[machine.key] = machine.ore;
			});
			Object.values(self.items).forEach(function(item) {
				cookie.inventory[item.key] = item.amount;
			});
			cookie.miningRateOptimizer.optimizeFor = self.miningRateOptimizer.optimizeFor;
			Object.values(self.miningRateOptimizer.ores).forEach(function(ore) {
				cookie.miningRateOptimizer.ores[ore.key] = {
					include: ore.include,
					coins: ore.coins,
					targetAmount: ore.targetAmount
				};
			});
			console.log("SAVE COOKIE: ", cookie);
			Cookies.set("Anwinity.dh3.data", JSON.stringify(cookie), { expires: 999 });
		},
		loadCookie() {
			const self = this;
			let cookie = Cookies.get("Anwinity.dh3.data");
			if(cookie) {
				cookie = JSON.parse(cookie);
				console.log("LOAD COOKIE: ", cookie);
				if(cookie.miningRateOptimizer) {
					if(cookie.miningRateOptimizer.optimizeFor) {
						self.miningRateOptimizer.optimizeFor = cookie.miningRateOptimizer.optimizeFor;
						if(cookie.miningRateOptimizer.ores) {
							Object.keys(cookie.miningRateOptimizer.ores).forEach(function(key) {
								let ore = cookie.miningRateOptimizer.ores[key];
								if(ore) {
									if(typeof ore.coins === "number") {
										self.miningRateOptimizer.ores[key].coins = ore.coins;
									}
									if(typeof ore.targetAmount === "number") {
										self.miningRateOptimizer.ores[key].targetAmount = ore.targetAmount;
									}
									if(typeof ore.include === "boolean") {
										self.miningRateOptimizer.ores[key].include = ore.include;
									}
								}
							});
						}
					}
				}
				if(cookie.xp) {
					Object.keys(cookie.xp).forEach(function(key) {
						if(typeof cookie.xp[key] === "number") {
							if(self.skills[key]) {
								self.skills[key].xp = cookie.xp[key];
							}
						}
					});
				}
				if(cookie.targetLevels) {
					Object.keys(cookie.targetLevels).forEach(function(key) {
						if(typeof cookie.targetLevels[key] === "number") {
							if(self.skills[key]) {
								self.skills[key].targetLevel = cookie.targetLevels[key];
							}
						}
					});
				}
				if(cookie.gems) {
					Object.keys(cookie.gems).forEach(function(key) {
						if(typeof cookie.gems[key] === "string") {
							if(self.tools[key]) {
								self.tools[key].gem = cookie.gems[key];
							}
						}
					});
				}
				if(cookie.machines) {
					Object.keys(cookie.machines).forEach(function(key) {
						if(typeof cookie.machines[key] === "string") {
							if(self.machines[key]) {
								self.machines[key].ore = cookie.machines[key];
							}
						}
					});
				}
				if(cookie.inventory) {
					Object.keys(cookie.inventory).forEach(function(key) {
						if(typeof cookie.inventory[key] === "number") {
							if(self.items[key]) {
								self.items[key].amount = cookie.inventory[key];
							}
						}
					});
				}
				if(typeof cookie.stardust === "number") {
					self.stardust = cookie.stardust;
				}
				if(typeof cookie.mana === "number") {
					self.mana = cookie.mana;
				}
				if(typeof cookie.oilIncome === "number") {
					self.oilIncome = cookie.oilIncome;
				}
				if(typeof cookie.donorBonus === "boolean") {
					self.donorBonus = cookie.donorBonus;
				}
			}
		},
		applyOptimizedMiningRateResult() {
			const self = this;
			let result = self.miningRateOptimizer.result;
			let drill = 0;
			let crusher = 0;
			result.forEach(function(r) {
				switch(r.machine) {
					case "miner": {
						self.machines.miner.ore = r.ore || "none";
						break;
					}
					case "drill": {
						drill++;
						self.machines[`drill${drill}`].ore = r.ore || "none";
						break;
					}
					case "crusher": {
						crusher++;
						self.machines[`crusher${crusher}`].ore = r.ore || "none";
						break;
					}
				}
			});
			while(drill < 3) {
				drill++;
				self.machines[`drill${drill}`].ore = "none";
			}
			while(crusher < 3) {
				crusher++;
				self.machines[`crusher${crusher}`].ore = "none";
			}
		},
		optimizeMining() {
			const self = this;
			self.miningRateOptimizer.busy = true;
			self.miningRateOptimizer.result = [];
			Vue.nextTick(function(){
				try {
					console.log("Optimizing...");
					let oil = self.oilIncome;
					
					let machines = ["miner"];
					if(oil >= 1) {
						machines.push("drill");
					}
					if(oil >= 2) {
						machines.push("drill");
					}
					if(oil >= 3) {
						machines.push("drill");
					}
					if(oil >= 6) {
						machines.push("crusher");
					}
					if(oil >= 9) {
						machines.push("crusher");
					}
					if(oil >= 12) {
						machines.push("crusher");
					}
					console.log("Using machines:", machines);
					
					let ores = [];
					Object.values(self.miningRateOptimizer.ores).forEach(function(ore) {
						if(self.miningRateOptimizer.optimizeFor=="coins" && !self.miningRateOptimizerForceDisabled[ore.key] && ore.include && ore.coins) {
							ores.push(ore.key);
						}
						else if(self.miningRateOptimizer.optimizeFor=="ores" && !self.miningRateOptimizerForceDisabled[ore.key] && ore.include && ore.targetAmount) {
							ores.push(ore.key);
						}
						else if(["mining", "crafting"].includes(self.miningRateOptimizer.optimizeFor) && !self.miningRateOptimizerForceDisabled[ore.key] && ore.include) {
							ores.push(ore.key);
						}
					});
					console.log("Using ores:", ores);
					
					let bestMinerOre = null;
					let bestMinerValue = 0;
					let bestDrillOre = null;
					let bestDrillValue = 0;
					let bestCrusherOre = null;
					let bestCrusherValue = 0;
					switch(self.miningRateOptimizer.optimizeFor) {
						case "coins": {
							ores.forEach(function(ore) {
								let minerValue = self.miningRateOptimizer.ores[ore].coins * self.ores[ore].tickChanceMiner;
								if(minerValue > bestMinerValue) {
									bestMinerOre = ore;
									bestMinerValue = minerValue;
								}
								
								let drillValue = self.miningRateOptimizer.ores[ore].coins * self.ores[ore].tickChanceDrill;
								if(drillValue > bestDrillValue) {
									bestDrillOre = ore;
									bestDrillValue = drillValue;
								}
								
								let crusherValue = self.miningRateOptimizer.ores[ore].coins * self.ores[ore].tickChanceCrusher;
								if(crusherValue > bestCrusherValue) {
									bestCrusherOre = ore;
									bestCrusherValue = crusherValue;
								}
							});
							break;
						}
						case "ores": {
							let permutations = permutateArray(ores, machines.length);
							console.log(`Checking ${permutations.length} permutations...`);
							
							function isBetter(currentBestTimes, newTimes) {
								for(let i = 0; i < currentBestTimes.length; i++) {
									if(newTimes[i] < currentBestTimes[i]) {
										return true;
									}
									else if(newTimes[i] > currentBestTimes[i]) {
										return false;
									}
								}
								return false;
							}
							
							let bestPermutation = null;
							let bestTimes = null;
							permutations.forEach(function(p) {
								if(!ores.every(o=>p.includes(o))) {
									return;
								}
								let times = {};
								ores.forEach(function(ore) {
									times[ore] = 0;
								});
								for(let i = 0; i < machines.length; i++) {
									let machine = machines[i];
									let ore = p[i];
									switch(machine) {
										case "miner": {
											times[ore] += self.ores[ore].tickChanceMiner;
											break;
										}
										case "drill": {
											times[ore] += self.ores[ore].tickChanceDrill;
											break;
										}
										case "crusher": {
											times[ore] += self.ores[ore].tickChanceCrusher;
											break;
										}
									}
								}
								ores.forEach(function(ore) {
									times[ore] = self.miningRateOptimizer.ores[ore].targetAmount/times[ore];
								});
								
								times = Object.values(times).sort((a,b) => b-a);
								if(!bestTimes || isBetter(bestTimes, times)) {
									bestTimes = times;
									bestPermutation = p;
								}
							});
							console.log("Best permutation:", bestPermutation);
							let result = [];
							if(bestPermutation) {
								for(let i = 0; i < machines.length; i++) {
									let machine = machines[i];
									let ore = bestPermutation[i];
									result.push({
										machine: machine,
										ore: ore
									});
								}
							}
							console.log("Result: ", result);
							self.miningRateOptimizer.result = result;
							break;
						}
						case "mining": {
							ores.forEach(function(ore) {
								let minerValue = self.ores[ore].xp * self.ores[ore].tickChanceMiner;
								if(minerValue > bestMinerValue) {
									bestMinerOre = ore;
									bestMinerValue = minerValue;
								}
								
								let drillValue = self.ores[ore].xp * self.ores[ore].tickChanceDrill;
								if(drillValue > bestDrillValue) {
									bestDrillOre = ore;
									bestDrillValue = drillValue;
								}
								
								let crusherValue = self.ores[ore].xp * self.ores[ore].tickChanceCrusher;
								if(crusherValue > bestCrusherValue) {
									bestCrusherOre = ore;
									bestCrusherValue = crusherValue;
								}
							});
							break;
						}
						case "crafting": {
							ores.forEach(function(ore) {
								let minerValue = self.bars[self.ores[ore].bar].xp * self.ores[ore].tickChanceMiner;
								if(minerValue > bestMinerValue) {
									bestMinerOre = ore;
									bestMinerValue = minerValue;
								}
								
								let drillValue = self.bars[self.ores[ore].bar].xp * self.ores[ore].tickChanceDrill;
								if(drillValue > bestDrillValue) {
									bestDrillOre = ore;
									bestDrillValue = drillValue;
								}
								
								let crusherValue = self.bars[self.ores[ore].bar].xp * self.ores[ore].tickChanceCrusher;
								if(crusherValue > bestCrusherValue) {
									bestCrusherOre = ore;
									bestCrusherValue = crusherValue;
								}
							});
							break;
						}
					}
					
					if(self.miningRateOptimizer.optimizeFor!="ores") {
						let result = [];
						machines.forEach(function(machine) {
							switch(machine) {
								case "miner": {
									result.push({
										machine: "miner",
										ore: bestMinerOre
									});
									break;
								}
								case "drill": {
									result.push({
										machine: "drill",
										ore: bestDrillOre
									});
									break;
								}
								case "crusher": {
									result.push({
										machine: "crusher",
										ore: bestCrusherOre
									});
									break;
								}
							}
						});
						console.log("Result: ", result);
						self.miningRateOptimizer.result = result;
					}
				}
				catch(err) {
					console.error(err);
				}
				finally {
					self.miningRateOptimizer.busy = false;
				}
			});
		}
	},
	mounted() {
		const self = this;
		this.loadCookie();
		if(window.location.hash && window.location.hash.length>1) {
			this.setTab(window.location.hash.substr(1));
		}
		else {
			this.tab = "updates";
		}
		
		$.ajaxSetup({ cache: false });
		$.getJSON("market.json", function(resp) {
			Object.values(resp.items).forEach(function(item) {
				item.key = item.item;
				delete item.item;
				item.name = _.startCase(item.key);
				item.category = _.startCase(item.category);
				if(item.key=="vial") {
					item.image = "images/smallVial.png";
				}
				else {
					item.image = "images/"+item.key+".png";
				}
			});
			self.market.time = moment(resp.time).format("llll");
			self.market.items = resp.items;
		});
	}
});