import { inventory } from 'Inventario';

export function createItem(presentation) {
  const container = {
		large: 589,
		width: 235,
		height: 210
  };
  const pallet = {
		large: 120,
		width: 100,
		height: 20,
		M3: function palletM3() {
  		return ((pallet.large / 100) * (pallet.width / 100) * (pallet.height / 100));
  	}
  };
  // measures in cm for the presentation of the item[galon, cuñete, etc]
  const product = inventory[presentation];
  const largeItem = product.measure.l;
  const widthItem = product.measure.w;
  const heightItem = product.measure.h;
  // get how many units for pallet
  const unitsLong = Math.floor(pallet.large / largeItem);
  const unitsWidth = Math.floor(pallet.width / widthItem);
  const levelsOfPallet = Math.floor((container.height - pallet.height) / heightItem); // Can't be higher than container
  const itemIsRounded = largeItem === widthItem;
  function getUnitsByFloorOfPallet(item) {
		if (itemIsRounded) {
		  return unitsLong * unitsWidth;
		} else {
	  	const min = Math.min(inventory[item].measure.l, inventory[item].measure.w);
		  const max = Math.max(inventory[item].measure.l, inventory[item].measure.w);
		  if (min + max <= pallet.width) {
				const h = Math.floor(pallet.large / max);
				const w = Math.floor(pallet.large / min);
				return h + w;
		  }
		}
  };
  function unidadM3() {
  	return (product.measure.l / 100) * (product.measure.w / 100) * (product.measure.h / 100);
  };
  
  // Methods of cubi
  return {
	unitsByPallets() {
	  return getUnitsByFloorOfPallet(presentation) * levelsOfPallet;
	},
	completePallet(qty) {
      return Math.floor(qty / (getUnitsByFloorOfPallet(presentation) * levelsOfPallet));
	},
	unidadesPendienteCubicar(qty, completePallet, unitsByPallets) {
      return qty - (completePallet * unitsByPallets);
    },
    metrosCubicosCompletos(qty, undsxCubicar, palletsCompletos) {
      const metroCubicoPallets = palletsCompletos * pallet.M3();
      return ((unidadM3() * undsxCubicar) + metroCubicoPallets).toFixed(2);
    }
  };
}