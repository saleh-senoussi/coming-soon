import { Component, OnInit } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html'
})
export class CountDownComponent implements OnInit {
  private destroy$ = new Subject();

  currentDate = new Date();
  targetDate = new Date('Jan 01 2023 00:00:00');

  MILLISECONDS_IN_SECOND = 1000;
  SECONDS_IN_MINUTE = 60;
  MINUTES_IN_HOUR = 60;
  HOURS_IN_DAY = 24;

  secondsToTargetDate!: number;
  minutesToTargetDate!: number;
  hoursToTargetDate!: number;
  daysToTargetDate!: number;

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getTimeDifference();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  private getTimeDifference() {
    const timeDifference = this.targetDate.getTime() - new Date().getTime();
    this.allocateTimeUnits(timeDifference);
  }

  private allocateTimeUnits(timeDifference: number): void {
    this.secondsToTargetDate = Math.floor(
      (timeDifference / this.MILLISECONDS_IN_SECOND) % this.SECONDS_IN_MINUTE
    );
    this.minutesToTargetDate = Math.floor(
      (timeDifference / (this.MILLISECONDS_IN_SECOND * this.MINUTES_IN_HOUR)) %
        this.SECONDS_IN_MINUTE
    );
    this.hoursToTargetDate = Math.floor(
      (timeDifference /
        (this.MILLISECONDS_IN_SECOND *
          this.MINUTES_IN_HOUR *
          this.SECONDS_IN_MINUTE)) %
        this.HOURS_IN_DAY
    );
    this.daysToTargetDate = Math.floor(
      timeDifference /
        (this.MILLISECONDS_IN_SECOND *
          this.MINUTES_IN_HOUR *
          this.SECONDS_IN_MINUTE *
          this.HOURS_IN_DAY)
    );
  }
}
