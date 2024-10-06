<!--
SPDX-FileCopyrightText: nennneko5787(@nennneko5787) and Nyansukey developer team
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
	<div>
		<!-- Label -->
		<div :class="$style.label">
			<slot name="label"></slot>
		</div>

		<!-- Color Picker Input -->
		<div :class="$style.inputWrapper">
			<input
				ref="colorInputEl"
				type="color"
				v-model="colorValue"
				:disabled="disabled"
				@input="onInput"
			/>

			<!-- Display RGB Code -->
			<span :class="$style.rgbCode">
				RGB({{ rgb.r }}, {{ rgb.g }}, {{ rgb.b }})
			</span>
		</div>

		<!-- Caption -->
		<div :class="$style.caption">
			<slot name="caption"></slot>
		</div>

		<!-- Save Button (if manual save is enabled) -->
		<MkButton
			v-if="manualSave && changed"
			primary
			:class="$style.save"
			@click="updated"
		>
			<i class="ti ti-check"></i> {{ i18n.ts.save }}
		</MkButton>

		<!-- Reset Button -->
		<MkButton
			v-if="manualSave"
			secondary
			:class="$style.reset"
			@click="resetColor"
		>
			<i class="ti ti-refresh"></i> {{ i18n.ts.reset }}
		</MkButton>
	</div>
</template>

<script lang="ts" setup>
// MkInput から基本的なロジックを継承・利用
import { ref, computed } from "vue";
import { i18n } from "@/i18n.js";
import MkButton from "@/components/MkButton.vue";

const props = defineProps({
	modelValue: String,
	manualSave: Boolean,
	disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const defaultColor = "#000000"; // デフォルトのカラーコード
const colorValue = ref("#" + props.modelValue || defaultColor);
const changed = ref(false);

const rgb = computed(() => {
	const hex = colorValue.value.replace("#", "");
	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return { r, g, b };
});

const onInput = () => {
	changed.value = true;
};

const updated = () => {
	emit("update:modelValue", colorValue.value.replace("#", ""));
	changed.value = false;
};

const resetColor = () => {
	colorValue.value = defaultColor;
	emit("update:modelValue", defaultColor.replace("#", ""));
	changed.value = false;
};
</script>

<style lang="scss" module>
.label {
	font-size: 0.85em;
	padding: 0 0 8px 0;
	user-select: none;

	&:empty {
		display: none;
	}
}

.caption {
	font-size: 0.85em;
	padding: 8px 0 0 0;
	color: var(--fgTransparentWeak);

	&:empty {
		display: none;
	}
}

.inputWrapper {
	display: flex;
	align-items: center;
	gap: 8px;
}

.rgbCode {
	font-size: 0.9em;
	color: var(--fgWeak);
}

.save {
	margin-top: 8px;
}

.reset {
	margin-top: 8px;
	margin-left: 8px;
}
</style>
