import { ChangeDetectionStrategy, Component, model, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (show()) {
      <div (click)="$event.target === $event.currentTarget && show.set(false)" class="fixed inset-0 z-[110] flex items-center justify-center bg-transparent transition-all p-4 cursor-pointer">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col transition-all duration-300 cursor-default"
             [class.max-w-4xl]="tempUiMode() === 'enhanced'"
             [class.max-w-3xl]="tempUiMode() !== 'enhanced'">
          
          <!-- Header -->
          <div class="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 class="font-semibold text-slate-100 flex items-center gap-2"
                [class.text-xl]="tempUiMode() === 'enhanced'" [class.font-bold]="tempUiMode() === 'enhanced'"
                [class.text-lg]="tempUiMode() !== 'enhanced'">
              <mat-icon class="text-slate-400 shrink-0" 
                        [class.!text-[24px]]="tempUiMode() === 'enhanced'" [class.!w-[24px]]="tempUiMode() === 'enhanced'" [class.!h-[24px]]="tempUiMode() === 'enhanced'"
                        [class.!text-[20px]]="tempUiMode() !== 'enhanced'" [class.!w-[20px]]="tempUiMode() !== 'enhanced'" [class.!h-[20px]]="tempUiMode() !== 'enhanced'">
                settings
              </mat-icon>
              Cài đặt chất lượng & camera
            </h2>
            <button (click)="show.set(false)" class="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-center"
                    [class.scale-110]="tempUiMode() === 'enhanced'">
              <mat-icon class="!text-[20px] !w-[20px] !h-[20px]">close</mat-icon>
            </button>
          </div>
          
          <!-- Content -->
          <div class="px-6 py-5 overflow-y-auto w-full flex-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              
              <!-- Left Column: Quality & Border Settings -->
              <div class="space-y-4">
                <!-- Quality Settings Card -->
                <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 md:p-5 space-y-4 shadow-inner">
                  <h3 class="font-medium text-slate-200 select-none pb-2 border-b border-slate-800/50 flex items-center gap-2"
                      [class.text-base]="tempUiMode() === 'enhanced'" [class.font-semibold]="tempUiMode() === 'enhanced'"
                      [class.text-sm]="tempUiMode() !== 'enhanced'">
                    <span class="w-1.5 h-1.5 rounded-full animate-[pulse_2s_infinite]"
                          [class.bg-emerald-500]="tempUiMode() !== 'enhanced'"
                          [class.bg-amber-500]="tempUiMode() === 'enhanced'"></span>
                    Chất lượng ghi hình
                  </h3>
                  
                  <div class="space-y-3">
                    <div (click)="setQualityPreset('high')" class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                        [class.bg-slate-800]="tempQualityPreset() === 'high'" [class.border-emerald-500]="tempUiMode() !== 'enhanced' && tempQualityPreset() === 'high'" [class.border-amber-500]="tempUiMode() === 'enhanced' && tempQualityPreset() === 'high'"
                        [class.bg-slate-850/40]="tempQualityPreset() !== 'high'" [class.border-slate-800/70]="tempQualityPreset() !== 'high'"
                        [class.hover:border-slate-700]="tempQualityPreset() !== 'high'">
                      <div>
                        <div class="font-medium text-slate-200 border-none select-none"
                             [class.text-base]="tempUiMode() === 'enhanced'" [class.text-sm]="tempUiMode() !== 'enhanced'" [class.font-semibold]="tempUiMode() === 'enhanced'">Cao</div>
                        <div class="mt-1"
                             [class.text-sm]="tempUiMode() === 'enhanced'" [class.text-slate-300]="tempUiMode() === 'enhanced'"
                             [class.text-xs]="tempUiMode() !== 'enhanced'" [class.text-slate-400]="tempUiMode() !== 'enhanced'">Video: 8 Mbps, Audio: 320 kbps</div>
                      </div>
                      <input type="radio" name="quality" value="high" [checked]="tempQualityPreset() === 'high'" class="sr-only pointer-events-none">
                      @if (tempQualityPreset() === 'high') {
                        <div class="rounded-full border-slate-900"
                             [class.bg-emerald-500]="tempUiMode() !== 'enhanced'" [class.shadow-[0_0_0_1px_rgba(16,185,129,1)]]="tempUiMode() !== 'enhanced'"
                             [class.bg-amber-500]="tempUiMode() === 'enhanced'" [class.shadow-[0_0_0_1px_rgba(245,158,11,1)]]="tempUiMode() === 'enhanced'"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'" [class.border-[4px]]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'" [class.border-[3px]]="tempUiMode() !== 'enhanced'"></div>
                      } @else {
                        <div class="rounded-full border border-slate-600 shrink-0 select-none"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'"></div>
                      }
                    </div>

                    <div (click)="setQualityPreset('medium')" class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                        [class.bg-slate-800]="tempQualityPreset() === 'medium'" [class.border-emerald-500]="tempUiMode() !== 'enhanced' && tempQualityPreset() === 'medium'" [class.border-amber-500]="tempUiMode() === 'enhanced' && tempQualityPreset() === 'medium'"
                        [class.bg-slate-850/40]="tempQualityPreset() !== 'medium'" [class.border-slate-800/70]="tempQualityPreset() !== 'medium'"
                        [class.hover:border-slate-700]="tempQualityPreset() !== 'medium'">
                      <div>
                        <div class="font-medium text-slate-200 border-none select-none"
                             [class.text-base]="tempUiMode() === 'enhanced'" [class.text-sm]="tempUiMode() !== 'enhanced'" [class.font-semibold]="tempUiMode() === 'enhanced'">Trung bình (Mặc định)</div>
                        <div class="mt-1"
                             [class.text-sm]="tempUiMode() === 'enhanced'" [class.text-slate-300]="tempUiMode() === 'enhanced'"
                             [class.text-xs]="tempUiMode() !== 'enhanced'" [class.text-slate-400]="tempUiMode() !== 'enhanced'">Video: 4 Mbps, Audio: 192 kbps</div>
                      </div>
                      <input type="radio" name="quality" value="medium" [checked]="tempQualityPreset() === 'medium'" class="sr-only pointer-events-none">
                      @if (tempQualityPreset() === 'medium') {
                        <div class="rounded-full border-slate-900"
                             [class.bg-emerald-500]="tempUiMode() !== 'enhanced'" [class.shadow-[0_0_0_1px_rgba(16,185,129,1)]]="tempUiMode() !== 'enhanced'"
                             [class.bg-amber-500]="tempUiMode() === 'enhanced'" [class.shadow-[0_0_0_1px_rgba(245,158,11,1)]]="tempUiMode() === 'enhanced'"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'" [class.border-[4px]]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'" [class.border-[3px]]="tempUiMode() !== 'enhanced'"></div>
                      } @else {
                        <div class="rounded-full border border-slate-600 shrink-0 select-none"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'"></div>
                      }
                    </div>

                    <div (click)="setQualityPreset('low')" class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                        [class.bg-slate-800]="tempQualityPreset() === 'low'" [class.border-emerald-500]="tempUiMode() !== 'enhanced' && tempQualityPreset() === 'low'" [class.border-amber-500]="tempUiMode() === 'enhanced' && tempQualityPreset() === 'low'"
                        [class.bg-slate-850/40]="tempQualityPreset() !== 'low'" [class.border-slate-800/70]="tempQualityPreset() !== 'low'"
                        [class.hover:border-slate-700]="tempQualityPreset() !== 'low'">
                      <div>
                         <div class="font-medium text-slate-200 border-none select-none"
                              [class.text-base]="tempUiMode() === 'enhanced'" [class.text-sm]="tempUiMode() !== 'enhanced'" [class.font-semibold]="tempUiMode() === 'enhanced'">Thấp</div>
                        <div class="mt-1"
                             [class.text-sm]="tempUiMode() === 'enhanced'" [class.text-slate-300]="tempUiMode() === 'enhanced'"
                             [class.text-xs]="tempUiMode() !== 'enhanced'" [class.text-slate-400]="tempUiMode() !== 'enhanced'">Video: 2 Mbps, Audio: 128 kbps</div>
                      </div>
                      <input type="radio" name="quality" value="low" [checked]="tempQualityPreset() === 'low'" class="sr-only pointer-events-none">
                      @if (tempQualityPreset() === 'low') {
                        <div class="rounded-full border-slate-900"
                             [class.bg-emerald-500]="tempUiMode() !== 'enhanced'" [class.shadow-[0_0_0_1px_rgba(16,185,129,1)]]="tempUiMode() !== 'enhanced'"
                             [class.bg-amber-500]="tempUiMode() === 'enhanced'" [class.shadow-[0_0_0_1px_rgba(245,158,11,1)]]="tempUiMode() === 'enhanced'"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'" [class.border-[4px]]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'" [class.border-[3px]]="tempUiMode() !== 'enhanced'"></div>
                      } @else {
                        <div class="rounded-full border border-slate-600 shrink-0 select-none"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'"></div>
                      }
                    </div>
                  </div>
                </div>

                <!-- Tốc độ khung hình (FPS) Option Card -->
                <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 md:p-5 space-y-3.5 shadow-inner">
                  <h3 class="font-medium text-slate-200 select-none pb-2 border-b border-slate-800/50 flex items-center gap-2"
                      [class.text-base]="tempUiMode() === 'enhanced'" [class.font-semibold]="tempUiMode() === 'enhanced'"
                      [class.text-sm]="tempUiMode() !== 'enhanced'">
                    <span class="w-1.5 h-1.5 rounded-full animate-[pulse_2s_infinite]"
                          [class.bg-emerald-500]="tempUiMode() !== 'enhanced'"
                          [class.bg-amber-500]="tempUiMode() === 'enhanced'"></span>
                    Tốc độ khung hình (FPS)
                  </h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div (click)="setFpsPreset(30)" class="group relative flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                        [class.bg-slate-800]="tempFpsPreset() === 30" [class.border-emerald-500]="tempUiMode() !== 'enhanced' && tempFpsPreset() === 30" [class.border-amber-500]="tempUiMode() === 'enhanced' && tempFpsPreset() === 30"
                        [class.bg-slate-850/40]="tempFpsPreset() !== 30" [class.border-slate-800/70]="tempFpsPreset() !== 30"
                        [class.hover:border-slate-600]="tempFpsPreset() !== 30">
                      
                      <!-- Elegant Tip Tooltip -->
                      <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 text-center scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 z-50 bg-slate-950/95 border border-slate-700/50 px-2.5 py-1.5 text-[11px] leading-normal text-slate-200 rounded-lg shadow-xl backdrop-blur-md selection:bg-transparent">
                        Đủ cho phần lớn trường hợp & phù hợp cho máy cấu hình trung bình
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950/95"></div>
                      </div>

                      <div>
                        <div class="font-medium text-slate-200 select-none border-none pb-0"
                             [class.text-base]="tempUiMode() === 'enhanced'"
                             [class.text-sm]="tempUiMode() !== 'enhanced'">30 FPS</div>
                      </div>
                      <input type="radio" name="fpsPreset" value="30" [checked]="tempFpsPreset() === 30" class="sr-only pointer-events-none">
                      @if (tempFpsPreset() === 30) {
                        <div class="rounded-full border-slate-900 shrink-0 select-none"
                             [class.bg-emerald-500]="tempUiMode() !== 'enhanced'" [class.shadow-[0_0_0_1px_rgba(16,185,129,1)]]="tempUiMode() !== 'enhanced'"
                             [class.bg-amber-500]="tempUiMode() === 'enhanced'" [class.shadow-[0_0_0_1px_rgba(245,158,11,1)]]="tempUiMode() === 'enhanced'"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'" [class.border-[4px]]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'" [class.border-[3px]]="tempUiMode() !== 'enhanced'"></div>
                      } @else {
                        <div class="rounded-full border border-slate-600 col-span-1 shrink-0 select-none"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'"></div>
                      }
                    </div>

                    <div (click)="setFpsPreset(60)" class="group relative flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                        [class.bg-slate-800]="tempFpsPreset() === 60" [class.border-emerald-500]="tempUiMode() !== 'enhanced' && tempFpsPreset() === 60" [class.border-amber-500]="tempUiMode() === 'enhanced' && tempFpsPreset() === 60"
                        [class.bg-slate-850/40]="tempFpsPreset() !== 60" [class.border-slate-800/70]="tempFpsPreset() !== 60"
                        [class.hover:border-slate-600]="tempFpsPreset() !== 60">
                      
                      <!-- Elegant Tip Tooltip -->
                      <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 text-center scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 z-50 bg-slate-950/95 border border-slate-700/50 px-2.5 py-1.5 text-[11px] leading-normal text-slate-200 rounded-lg shadow-xl backdrop-blur-md selection:bg-transparent">
                        Khi video có chuyển động nhanh & cấu hình máy của bạn cao
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950/95"></div>
                      </div>

                      <div>
                        <div class="font-medium text-slate-200 select-none border-none pb-0"
                             [class.text-base]="tempUiMode() === 'enhanced'"
                             [class.text-sm]="tempUiMode() !== 'enhanced'">60 FPS</div>
                      </div>
                      <input type="radio" name="fpsPreset" value="60" [checked]="tempFpsPreset() === 60" class="sr-only pointer-events-none">
                      @if (tempFpsPreset() === 60) {
                        <div class="rounded-full border-slate-900 shrink-0 select-none"
                             [class.bg-emerald-500]="tempUiMode() !== 'enhanced'" [class.shadow-[0_0_0_1px_rgba(16,185,129,1)]]="tempUiMode() !== 'enhanced'"
                             [class.bg-amber-500]="tempUiMode() === 'enhanced'" [class.shadow-[0_0_0_1px_rgba(245,158,11,1)]]="tempUiMode() === 'enhanced'"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'" [class.border-[4px]]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'" [class.border-[3px]]="tempUiMode() !== 'enhanced'"></div>
                      } @else {
                        <div class="rounded-full border border-slate-600 col-span-1 shrink-0 select-none"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'"></div>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Interface & FPS & camera size slider -->
              <div class="space-y-4">
                <!-- Interface Mode Option Card -->
                <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 md:p-5 space-y-3.5 shadow-inner">
                  <h3 class="font-medium text-slate-200 select-none pb-2 border-b border-slate-800/50 flex items-center gap-2"
                      [class.text-base]="tempUiMode() === 'enhanced'" [class.font-semibold]="tempUiMode() === 'enhanced'"
                      [class.text-sm]="tempUiMode() !== 'enhanced'">
                    <span class="w-1.5 h-1.5 rounded-full animate-[pulse_2s_infinite]"
                          [class.bg-emerald-500]="tempUiMode() !== 'enhanced'"
                          [class.bg-amber-500]="tempUiMode() === 'enhanced'"></span>
                    Chế độ giao diện
                  </h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div (click)="setUiMode('default')" class="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                        [class.bg-slate-800]="tempUiMode() === 'default'" [class.border-emerald-500]="tempUiMode() === 'default'"
                        [class.bg-slate-850/40]="tempUiMode() !== 'default'" [class.border-slate-800/70]="tempUiMode() !== 'default'"
                        [class.hover:border-slate-600]="tempUiMode() !== 'default'">
                      <div>
                        <div class="font-medium text-slate-200 select-none"
                             [class.text-base]="tempUiMode() === 'enhanced'"
                             [class.text-sm]="tempUiMode() !== 'enhanced'">Mặc định</div>
                      </div>
                      <input type="radio" name="uiMode" value="default" [checked]="tempUiMode() === 'default'" class="sr-only pointer-events-none">
                      @if (tempUiMode() === 'default') {
                        <div class="rounded-full border-slate-900"
                             [class.bg-emerald-500]="tempUiMode() !== 'enhanced'" [class.shadow-[0_0_0_1px_rgba(16,185,129,1)]]="tempUiMode() !== 'enhanced'"
                             [class.bg-amber-500]="tempUiMode() === 'enhanced'" [class.shadow-[0_0_0_1px_rgba(245,158,11,1)]]="tempUiMode() === 'enhanced'"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'" [class.border-[4px]]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'" [class.border-[3px]]="tempUiMode() !== 'enhanced'"></div>
                      } @else {
                        <div class="rounded-full border border-slate-600 col-span-1 shrink-0 select-none"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'"></div>
                      }
                    </div>

                    <div (click)="setUiMode('enhanced')" class="group relative flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
                        [class.bg-slate-800]="tempUiMode() === 'enhanced'" [class.border-amber-500]="tempUiMode() === 'enhanced'"
                        [class.bg-slate-850/40]="tempUiMode() !== 'enhanced'" [class.border-slate-800/70]="tempUiMode() !== 'enhanced'"
                        [class.hover:border-slate-650]="tempUiMode() !== 'enhanced'"
                        [class.hover:border-slate-600]="tempUiMode() !== 'enhanced'">
                      
                      <!-- Elegant Tailwind Tooltip -->
                      <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 z-50 bg-slate-950/95 border border-slate-700/50 px-2.5 py-1.5 text-[11px] leading-normal text-slate-200 rounded-lg shadow-xl backdrop-blur-md selection:bg-transparent">
                        Dành cho người cao tuổi hoặc gặp vấn đề về thị lực.
                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950/95"></div>
                      </div>

                      <div>
                        <div class="font-medium text-slate-200 select-none flex items-center gap-1.5"
                             [class.text-base]="tempUiMode() === 'enhanced'"
                             [class.text-sm]="tempUiMode() !== 'enhanced'">
                          <span>Tăng cường</span>
                        </div>
                      </div>
                      <input type="radio" name="uiMode" value="enhanced" [checked]="tempUiMode() === 'enhanced'" class="sr-only pointer-events-none">
                      @if (tempUiMode() === 'enhanced') {
                        <div class="rounded-full border-slate-900"
                             [class.bg-emerald-500]="tempUiMode() !== 'enhanced'" [class.shadow-[0_0_0_1px_rgba(16,185,129,1)]]="tempUiMode() !== 'enhanced'"
                             [class.bg-amber-500]="tempUiMode() === 'enhanced'" [class.shadow-[0_0_0_1px_rgba(245,158,11,1)]]="tempUiMode() === 'enhanced'"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'" [class.border-[4px]]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'" [class.border-[3px]]="tempUiMode() !== 'enhanced'"></div>
                      } @else {
                        <div class="rounded-full border border-slate-600 col-span-1 shrink-0 select-none"
                             [class.w-5]="tempUiMode() === 'enhanced'" [class.h-5]="tempUiMode() === 'enhanced'"
                             [class.w-4]="tempUiMode() !== 'enhanced'" [class.h-4]="tempUiMode() !== 'enhanced'"></div>
                      }
                    </div>
                  </div>
                </div>

                <!-- Camera Border Settings Card -->
                <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 md:p-5 space-y-4 shadow-inner">
                  <h3 class="font-medium text-slate-200 select-none pb-2 border-b border-slate-800/50 flex items-center gap-2"
                      [class.text-base]="tempUiMode() === 'enhanced'" [class.font-semibold]="tempUiMode() === 'enhanced'"
                      [class.text-sm]="tempUiMode() !== 'enhanced'">
                    <span class="w-1.5 h-1.5 rounded-full animate-[pulse_2s_infinite]"
                          [class.bg-emerald-500]="tempUiMode() !== 'enhanced'"
                          [class.bg-amber-500]="tempUiMode() === 'enhanced'"></span>
                    Cài đặt viền Camera
                  </h3>

                  <!-- Checkbox -->
                  <div (click)="tempShowBorder.set(!tempShowBorder())" class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer border-slate-800/70 bg-slate-850/40 hover:border-slate-700 transition-colors select-none text-slate-200">
                    <input 
                      type="checkbox" 
                      [checked]="tempShowBorder()" 
                      class="w-4 h-4 rounded text-emerald-500 border-slate-700 bg-slate-800 focus:ring-emerald-500 pointer-events-none"
                      [class.text-emerald-500]="tempUiMode() !== 'enhanced' && tempShowBorder()"
                      [class.text-amber-500]="tempUiMode() === 'enhanced' && tempShowBorder()"
                    >
                    <span class="font-medium animate-none"
                          [class.text-base]="tempUiMode() === 'enhanced'"
                          [class.text-sm]="tempUiMode() !== 'enhanced'">Hiển thị viền tròn quanh camera</span>
                  </div>

                  <!-- Color Selection (only shown if checked) -->
                  @if (tempShowBorder()) {
                    <div class="space-y-3 pt-1">
                      <div class="text-slate-400 select-none font-medium"
                           [class.text-sm]="tempUiMode() === 'enhanced'"
                           [class.text-xs]="tempUiMode() !== 'enhanced'">Màu sắc của viền:</div>
                      
                      <div class="grid grid-cols-7 gap-2">
                        @for (color of borderColors; track color.value) {
                          <div class="relative group flex justify-center">
                            <button 
                              type="button"
                              (click)="tempBorderColor.set(color.value)"
                              [style.backgroundColor]="color.value"
                              class="w-8 h-8 rounded-full border-2 cursor-pointer transition-all hover:scale-110 flex items-center justify-center shadow-lg"
                              [class.border-white]="tempBorderColor() === color.value"
                              [class.border-slate-800]="tempBorderColor() !== color.value"
                              [class.ring-2]="tempBorderColor() === color.value"
                              [class.ring-offset-2]="tempBorderColor() === color.value"
                              [class.ring-offset-slate-900]="tempBorderColor() === color.value"
                              [class.ring-emerald-500]="tempUiMode() !== 'enhanced' && tempBorderColor() === color.value"
                              [class.ring-amber-500]="tempUiMode() === 'enhanced' && tempBorderColor() === color.value"
                            >
                              @if (tempBorderColor() === color.value) {
                                <mat-icon class="!text-[16px] !w-[16px] !h-[16px] text-slate-950 font-semibold drop-shadow-sm flex items-center justify-center">check</mat-icon>
                              }
                            </button>
                            <!-- Tooltip -->
                            <div class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 z-50 bg-slate-950 border border-slate-800 px-2.5 py-1 text-[11px] text-slate-200 rounded shadow-md select-none leading-normal">
                              {{ color.name }}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>

                <!-- Camera Size Slider (Webcam) - in the right column -->
                <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 md:p-5 space-y-3.5 shadow-inner">
                  <h3 class="relative font-medium text-slate-200 mb-1 select-none pb-2 border-b border-slate-800/50 flex items-center justify-between gap-2"
                      [class.text-base]="tempUiMode() === 'enhanced'" [class.font-semibold]="tempUiMode() === 'enhanced'"
                      [class.text-sm]="tempUiMode() !== 'enhanced'">
                    <div class="flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full animate-[pulse_2s_infinite]"
                            [class.bg-emerald-500]="tempUiMode() !== 'enhanced'"
                            [class.bg-amber-500]="tempUiMode() === 'enhanced'"></span>
                      Kích cỡ Video (Webcam)
                    </div>
                    <span class="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 shadow-sm"
                         [class.text-emerald-400]="tempUiMode() !== 'enhanced'"
                         [class.text-amber-400]="tempUiMode() === 'enhanced'"
                         [class.text-sm]="tempUiMode() === 'enhanced'">{{ tempCameraSize() }}px</span>
                  </h3>
                  <div class="flex items-center gap-4 pt-1">
                    <span class="font-mono w-12 text-slate-400"
                          [class.text-sm]="tempUiMode() === 'enhanced'" [class.text-slate-300]="tempUiMode() === 'enhanced'"
                          [class.text-xs]="tempUiMode() !== 'enhanced'">120px</span>
                    <input 
                       type="range" 
                       min="120" 
                       max="360" 
                       step="5"
                       [value]="tempCameraSize()" 
                       (input)="updateCameraSize($event)"
                       class="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2"
                       [class.accent-emerald-500]="tempUiMode() !== 'enhanced'" [class.focus:ring-emerald-500/50]="tempUiMode() !== 'enhanced'"
                       [class.accent-amber-500]="tempUiMode() === 'enhanced'" [class.focus:ring-amber-500/50]="tempUiMode() === 'enhanced'"
                    >
                    <span class="font-mono w-12 text-right text-slate-400"
                          [class.text-sm]="tempUiMode() === 'enhanced'" [class.text-slate-300]="tempUiMode() === 'enhanced'"
                          [class.text-xs]="tempUiMode() !== 'enhanced'">360px</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <!-- Footer / Action Buttons -->
          <div class="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex gap-3">
            <button (click)="resetSettings.emit()" class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700/50"
                    [class.text-base]="tempUiMode() === 'enhanced'"
                    [class.text-sm]="tempUiMode() !== 'enhanced'">
              Về mặc định
            </button>
            <button (click)="saveSettings.emit()" class="flex-1 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    [class.bg-emerald-600]="tempUiMode() !== 'enhanced'" [class.hover:bg-emerald-500]="tempUiMode() !== 'enhanced'"
                    [class.bg-amber-600]="tempUiMode() === 'enhanced'" [class.hover:bg-amber-500]="tempUiMode() === 'enhanced'"
                    [class.text-base]="tempUiMode() === 'enhanced'"
                    [class.text-sm]="tempUiMode() !== 'enhanced'">
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
  tempUiMode = model<'default' | 'enhanced'>('default');
  tempFpsPreset = model<30 | 60>(30);
  tempShowBorder = model<boolean>(false);
  tempBorderColor = model<string>('#10b981');

  saveSettings = output<void>();
  resetSettings = output<void>();

  borderColors = [
    { value: '#10b981', name: 'Xanh Lá' },
    { value: '#f59e0b', name: 'Vàng' },
    { value: '#3b82f6', name: 'Xanh Dương' },
    { value: '#0ea5e9', name: 'Xanh Lam' },
    { value: '#8b5cf6', name: 'Tím' },
    { value: '#f43f5e', name: 'Hồng Đỏ' },
    { value: '#ffffff', name: 'Trắng Sáng' }
  ];

  setQualityPreset(preset: 'high' | 'medium' | 'low') {
    this.tempQualityPreset.set(preset);
  }

  setUiMode(mode: 'default' | 'enhanced') {
    this.tempUiMode.set(mode);
  }

  setFpsPreset(fps: 30 | 60) {
    this.tempFpsPreset.set(fps);
  }

  updateCameraSize(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tempCameraSize.set(Number(input.value));
  }
}
