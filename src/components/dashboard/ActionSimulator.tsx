'use client';

import { useState } from 'react';
import {
  calculateFootprint,
  formatCo2,
  formatPercent,
  formatTonnes,
  TARGET_TONNES,
  type FootprintInput,
  type Diet,
  type Shopping,
  type FoodWaste,
} from '@/lib';
import { Card, Icon, Badge, ProgressBar } from '@/components/ui';
import { DIET_LABELS, SHOPPING_LABELS, FOOD_WASTE_LABELS } from '@/components/labels';

export interface ActionSimulatorProps {
  input: FootprintInput;
}

export function ActionSimulator({ input }: ActionSimulatorProps) {
  // Baseline results
  const baselineResult = calculateFootprint(input);
  const baselineTonnes = baselineResult.totalTonnes;

  // Simulator state: adjustments from baseline
  const [carReductionPercent, setCarReductionPercent] = useState(0); // 0 to 100%
  const [shortHaulReduction, setShortHaulReduction] = useState(0); // 0 to baseline
  const [longHaulReduction, setLongHaulReduction] = useState(0); // 0 to baseline
  const [renewablePercent, setRenewablePercent] = useState(input.home.renewablePercent);
  const [diet, setDiet] = useState<Diet>(input.food.diet);
  const [foodWaste, setFoodWaste] = useState<FoodWaste>(input.food.foodWaste);
  const [shopping, setShopping] = useState<Shopping>(input.consumption.shopping);
  const [recycles, setRecycles] = useState(input.consumption.recycles);

  // Construct simulated input
  const simulatedCarKm = input.transport.carKmPerWeek * (1 - carReductionPercent / 100);
  const simulatedShortHaul = Math.max(
    0,
    input.transport.flightsShortHaulPerYear - shortHaulReduction,
  );
  const simulatedLongHaul = Math.max(0, input.transport.flightsLongHaulPerYear - longHaulReduction);

  const simulatedInput: FootprintInput = {
    ...input,
    transport: {
      ...input.transport,
      carKmPerWeek: simulatedCarKm,
      flightsShortHaulPerYear: simulatedShortHaul,
      flightsLongHaulPerYear: simulatedLongHaul,
    },
    home: {
      ...input.home,
      renewablePercent,
    },
    food: {
      ...input.food,
      diet,
      foodWaste,
    },
    consumption: {
      ...input.consumption,
      shopping,
      recycles,
    },
  };

  const simulatedResult = calculateFootprint(simulatedInput);
  const simulatedTonnes = simulatedResult.totalTonnes;
  const savedKg = Math.max(0, baselineResult.totalKg - simulatedResult.totalKg);
  const savedTonnes = savedKg / 1000;
  const reductionPercent =
    baselineResult.totalKg > 0 ? (savedKg / baselineResult.totalKg) * 100 : 0;

  // Determine diets that are reductions or equal
  const DIET_ORDER: Diet[] = [
    'high_meat',
    'medium_meat',
    'low_meat',
    'pescatarian',
    'vegetarian',
    'vegan',
  ];
  const baselineDietIndex = DIET_ORDER.indexOf(input.food.diet);
  const availableDiets = DIET_ORDER.slice(baselineDietIndex);

  // Determine shopping levels that are reductions or equal
  const SHOPPING_ORDER: Shopping[] = ['frequent', 'average', 'minimal'];
  const baselineShoppingIndex = SHOPPING_ORDER.indexOf(input.consumption.shopping);
  const availableShopping = SHOPPING_ORDER.slice(baselineShoppingIndex);

  // Food waste levels that are reductions or equal
  const WASTE_ORDER: FoodWaste[] = ['high', 'medium', 'low'];
  const baselineWasteIndex = WASTE_ORDER.indexOf(input.food.foodWaste);
  const availableWaste = WASTE_ORDER.slice(baselineWasteIndex);

  // Check if any simulation controls are relevant/renderable
  const hasCar = input.transport.carKmPerWeek > 0;
  const hasShortFlights = input.transport.flightsShortHaulPerYear > 0;
  const hasLongFlights = input.transport.flightsLongHaulPerYear > 0;
  const hasHomeElectricity = input.home.electricityKwhPerMonth > 0;
  const canImproveRenewables = input.home.renewablePercent < 100;
  const canImproveDiet = input.food.diet !== 'vegan';
  const canImproveWaste = input.food.foodWaste !== 'low';
  const canImproveShopping = input.consumption.shopping !== 'minimal';
  const canImproveRecycling = !input.consumption.recycles;

  const hasAnySimulatorAction =
    hasCar ||
    hasShortFlights ||
    hasLongFlights ||
    (hasHomeElectricity && canImproveRenewables) ||
    canImproveDiet ||
    canImproveWaste ||
    canImproveShopping ||
    canImproveRecycling;

  if (!hasAnySimulatorAction) {
    return null;
  }

  // Calculate target progress percentage
  // 0% is baseline, 100% is meeting or beating the 2.3t target
  const distanceToTarget = Math.max(0, baselineTonnes - TARGET_TONNES);
  const simulatedDistance = Math.max(0, simulatedTonnes - TARGET_TONNES);
  const targetProgress =
    distanceToTarget > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(((distanceToTarget - simulatedDistance) / distanceToTarget) * 100),
          ),
        )
      : 100;

  return (
    <Card className="border border-primary/20 bg-gradient-to-br from-secondary/10 via-white to-accent/5 backdrop-blur-md">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon name="spark" size={22} className="animate-pulse" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">Action Simulator</h3>
              <p className="text-xs text-ink/70">
                Model behavior changes in real-time to see how they reduce your footprint.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={simulatedTonnes <= TARGET_TONNES ? 'primary' : 'warning'}>
              {simulatedTonnes <= TARGET_TONNES ? '1.5°C Aligned!' : 'Above Target'}
            </Badge>
          </div>
        </div>

        {/* Real-time comparison widget */}
        <div className="grid gap-4 rounded-2xl bg-white/70 p-4 shadow-inner ring-1 ring-primary/5 sm:grid-cols-3">
          <div className="text-center sm:border-r sm:border-primary/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">Current</p>
            <p className="font-display text-2xl font-bold text-ink/70">
              {formatTonnes(baselineTonnes)}
            </p>
            <p className="text-[10px] text-ink/50">Baseline footprint</p>
          </div>
          <div className="text-center sm:border-r sm:border-primary/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Simulated</p>
            <p className="font-display text-3xl font-extrabold text-primary-dark">
              {formatTonnes(simulatedTonnes)}
            </p>
            <p className="text-[10px] text-primary/70">With your selected changes</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Total Saved
            </p>
            <p className="font-display text-2xl font-bold text-accent">
              -{formatTonnes(savedTonnes)}
            </p>
            <p className="text-[10px] font-medium text-accent">
              {formatPercent(reductionPercent)} reduction
            </p>
          </div>
        </div>

        {/* Progress towards 1.5C target */}
        <div className="flex flex-col gap-2 rounded-xl bg-primary/5 p-4 ring-1 ring-primary/10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink">
              Progress toward 1.5°C Target ({TARGET_TONNES}t)
            </span>
            <span className="font-bold text-primary-dark">{targetProgress}%</span>
          </div>
          <ProgressBar
            value={targetProgress}
            label="Simulator target progress"
            valueText={`${targetProgress}% of the way to the 1.5°C target`}
            tone={simulatedTonnes <= TARGET_TONNES ? 'primary' : 'accent'}
          />
          <p className="text-[11px] text-ink/70 leading-normal">
            {simulatedTonnes <= TARGET_TONNES ? (
              <span className="font-semibold text-primary-dark flex items-center gap-1">
                <Icon name="check" size={12} />
                Excellent! These changes align your lifestyle with the global 1.5°C climate pathway.
              </span>
            ) : (
              `Reduce by another ${formatTonnes(Math.max(0, simulatedTonnes - TARGET_TONNES))} to meet the target.`
            )}
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Transport Section */}
          {(hasCar || hasShortFlights || hasLongFlights) && (
            <div className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-white/50 p-4">
              <h4 className="flex items-center gap-1.5 font-display font-bold text-ink text-sm uppercase tracking-wide">
                <Icon name="car" size={16} className="text-primary" />
                Transport reductions
              </h4>

              {hasCar && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="sim-car-slider" className="font-medium text-ink">
                      Reduce car driving
                    </label>
                    <span className="font-bold text-primary-dark">{carReductionPercent}% less</span>
                  </div>
                  <input
                    id="sim-car-slider"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={carReductionPercent}
                    onChange={(e) => setCarReductionPercent(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/20 accent-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-[10px] text-ink/60">
                    Saves ~
                    {formatCo2(
                      input.transport.carKmPerWeek *
                        52 *
                        (1.92 / 10) * // approximate
                        (carReductionPercent / 100),
                    )}
                    /year
                  </p>
                </div>
              )}

              {hasShortFlights && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="sim-short-flights" className="font-medium text-ink">
                      Avoid short-haul flights
                    </label>
                    <span className="font-bold text-primary-dark">
                      -{shortHaulReduction} of {input.transport.flightsShortHaulPerYear}
                    </span>
                  </div>
                  <input
                    id="sim-short-flights"
                    type="range"
                    min="0"
                    max={input.transport.flightsShortHaulPerYear}
                    step="1"
                    value={shortHaulReduction}
                    onChange={(e) => setShortHaulReduction(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/20 accent-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              {hasLongFlights && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="sim-long-flights" className="font-medium text-ink">
                      Avoid long-haul flights
                    </label>
                    <span className="font-bold text-primary-dark">
                      -{longHaulReduction} of {input.transport.flightsLongHaulPerYear}
                    </span>
                  </div>
                  <input
                    id="sim-long-flights"
                    type="range"
                    min="0"
                    max={input.transport.flightsLongHaulPerYear}
                    step="1"
                    value={longHaulReduction}
                    onChange={(e) => setLongHaulReduction(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-primary/20 accent-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}
            </div>
          )}

          {/* Home Energy Section */}
          {hasHomeElectricity && (
            <div className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-white/50 p-4">
              <h4 className="flex items-center gap-1.5 font-display font-bold text-ink text-sm uppercase tracking-wide">
                <Icon name="home" size={16} className="text-accent" />
                Home energy upgrades
              </h4>

              {canImproveRenewables ? (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="sim-renewable-slider" className="font-medium text-ink">
                      Increase renewable electricity
                    </label>
                    <span className="font-bold text-accent">{renewablePercent}% green</span>
                  </div>
                  <input
                    id="sim-renewable-slider"
                    type="range"
                    min={input.home.renewablePercent}
                    max="100"
                    step="5"
                    value={renewablePercent}
                    onChange={(e) => setRenewablePercent(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-accent/20 accent-accent focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <p className="text-[10px] text-ink/60">
                    Slide to simulate switching to a solar/green tariff.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-ink/60">
                  Your home electricity is already 100% renewable! Fantastic.
                </p>
              )}
            </div>
          )}

          {/* Food Section */}
          {(canImproveDiet || canImproveWaste) && (
            <div className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-white/50 p-4">
              <h4 className="flex items-center gap-1.5 font-display font-bold text-ink text-sm uppercase tracking-wide">
                <Icon name="food" size={16} className="text-secondary" />
                Food & diet shifts
              </h4>

              {canImproveDiet && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="sim-diet" className="text-xs font-medium text-ink">
                    Adjust diet type
                  </label>
                  <select
                    id="sim-diet"
                    value={diet}
                    onChange={(e) => setDiet(e.target.value as Diet)}
                    className="w-full rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {availableDiets.map((d) => (
                      <option key={d} value={d}>
                        {DIET_LABELS[d]}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {canImproveWaste && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="sim-food-waste" className="text-xs font-medium text-ink">
                    Adjust food waste
                  </label>
                  <select
                    id="sim-food-waste"
                    value={foodWaste}
                    onChange={(e) => setFoodWaste(e.target.value as FoodWaste)}
                    className="w-full rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {availableWaste.map((w) => (
                      <option key={w} value={w}>
                        {FOOD_WASTE_LABELS[w]}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Consumption Section */}
          {(canImproveShopping || canImproveRecycling) && (
            <div className="flex flex-col gap-4 rounded-xl border border-primary/10 bg-white/50 p-4">
              <h4 className="flex items-center gap-1.5 font-display font-bold text-ink text-sm uppercase tracking-wide">
                <Icon name="shopping" size={16} className="text-warning" />
                Shopping & waste
              </h4>

              {canImproveShopping && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="sim-shopping" className="text-xs font-medium text-ink">
                    Adjust shopping level
                  </label>
                  <select
                    id="sim-shopping"
                    value={shopping}
                    onChange={(e) => setShopping(e.target.value as Shopping)}
                    className="w-full rounded-xl border border-primary/20 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {availableShopping.map((s) => (
                      <option key={s} value={s}>
                        {SHOPPING_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {canImproveRecycling && (
                <div className="flex items-center gap-2">
                  <input
                    id="sim-recycle-checkbox"
                    type="checkbox"
                    checked={recycles}
                    onChange={(e) => setRecycles(e.target.checked)}
                    className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="sim-recycle-checkbox"
                    className="text-xs font-medium text-ink cursor-pointer"
                  >
                    Start recycling consistently
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
