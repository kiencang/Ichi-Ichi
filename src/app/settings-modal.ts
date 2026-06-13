import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';

@Component({
  selector: 'app-settings-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (show()) {
      <div class="fixed inset-0 z-[110] flex items-center justify-center bg-[#070b14]/01 transition-all p-4">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 class="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Cài đặt chất lượng
            </h2>
            <button (click)="show.set(false)" class="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-800 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Content -->
          <div class="px-6 py-5 overflow-y-auto w-full flex-1">
            <div class="space-y-4">
              <label class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                  [class.bg-slate-800]="tempQualityPreset() === 'high'" [class.border-emerald-500]="tempQualityPreset() === 'high'"
                  [class.bg-slate-800/40]="tempQualityPreset() !== 'high'" [class.border-slate-700]="tempQualityPreset() !== 'high'"
                  [class.hover:border-slate-600]="tempQualityPreset() !== 'high'">
                <div>
                  <div class="font-medium text-slate-200 border-none select-none">Cao</div>
                  <div class="text-xs text-slate-400 mt-1">Video: 8 Mbps, Audio: 320 kbps</div>
                </div>
                <input type="radio" name="quality" value="high" [checked]="tempQualityPreset() === 'high'" (change)="setQualityPreset('high')" class="hidden">
                @if (tempQualityPreset() === 'high') {
                  <div class="w-4 h-4 rounded-full bg-emerald-500 border-[3px] border-slate-900 shadow-[0_0_0_1px_rgba(16,185,129,1)]"></div>
                } @else {
                  <div class="w-4 h-4 rounded-full border border-slate-500"></div>
                }
              </label>

              <label class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                  [class.bg-slate-800]="tempQualityPreset() === 'medium'" [class.border-emerald-500]="tempQualityPreset() === 'medium'"
                  [class.bg-slate-800/40]="tempQualityPreset() !== 'medium'" [class.border-slate-700]="tempQualityPreset() !== 'medium'"
                  [class.hover:border-slate-600]="tempQualityPreset() !== 'medium'">
                <div>
                  <div class="font-medium text-slate-200 border-none select-none">Trung bình (Mặc định)</div>
                  <div class="text-xs text-slate-400 mt-1">Video: 4 Mbps, Audio: 128 kbps</div>
                </div>
                <input type="radio" name="quality" value="medium" [checked]="tempQualityPreset() === 'medium'" (change)="setQualityPreset('medium')" class="hidden">
                @if (tempQualityPreset() === 'medium') {
                  <div class="w-4 h-4 rounded-full bg-emerald-500 border-[3px] border-slate-900 shadow-[0_0_0_1px_rgba(16,185,129,1)]"></div>
                } @else {
                  <div class="w-4 h-4 rounded-full border border-slate-500"></div>
                }
              </label>

              <label class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                  [class.bg-slate-800]="tempQualityPreset() === 'low'" [class.border-emerald-500]="tempQualityPreset() === 'low'"
                  [class.bg-slate-800/40]="tempQualityPreset() !== 'low'" [class.border-slate-700]="tempQualityPreset() !== 'low'"
                  [class.hover:border-slate-600]="tempQualityPreset() !== 'low'">
                <div>
                  <div class="font-medium text-slate-200 border-none select-none">Thấp</div>
                  <div class="text-xs text-slate-400 mt-1">Video: 2 Mbps, Audio: 64 kbps</div>
                </div>
                <input type="radio" name="quality" value="low" [checked]="tempQualityPreset() === 'low'" (change)="setQualityPreset('low')" class="hidden">
                @if (tempQualityPreset() === 'low') {
                  <div class="w-4 h-4 rounded-full bg-emerald-500 border-[3px] border-slate-900 shadow-[0_0_0_1px_rgba(16,185,129,1)]"></div>
                } @else {
                  <div class="w-4 h-4 rounded-full border border-slate-500"></div>
                }
              </label>
            </div>
            
            <div class="mt-6 border-t border-slate-700/50 pt-5">
              <h3 class="text-sm font-medium text-slate-200 mb-4 select-none">Kích cỡ Video (Webcam)</h3>
              <div class="flex items-center gap-4">
                <span class="text-xs text-slate-400 font-mono w-10">120px</span>
                <input 
                   type="range" 
                   min="120" 
                   max="360" 
                   step="5"
                   [value]="tempCameraSize()" 
                   (input)="updateCameraSize($event)"
                   class="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                <span class="text-xs text-slate-400 font-mono w-10 text-right">360px</span>
              </div>
              <div class="text-center mt-2 text-xs font-mono text-emerald-400">{{ tempCameraSize() }}px</div>
            </div>
          </div>
          
          <!-- Footer / Action Buttons -->
          <div class="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex gap-3">
            <button (click)="resetSettings.emit()" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700/50 text-sm">
              Về mặc định
            </button>
            <button (click)="saveSettings.emit()" class="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm">
              Lưu cài đặt
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class SettingsModal {
  show = model(false);
  tempQualityPreset = model<'high' | 'medium' | 'low'>('medium');
  tempCameraSize = model<number>(120);

  saveSettings = output<void>();
  resetSettings = output<void>();

  setQualityPreset(preset: 'high' | 'medium' | 'low') {
    this.tempQualityPreset.set(preset);
  }

  updateCameraSize(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tempCameraSize.set(Number(input.value));
  }
}
