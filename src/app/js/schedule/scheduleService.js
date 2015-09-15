var unisheduleApp = angular.module('unisheduleApp');

unisheduleApp.service('ScheduleService', [
    '$q', 'Schedule', function($q, Schedule) {
        function isCurrentWeek(week) {
            var startDate = dateFromString(week.date_start),
                endDate = dateFromString(week.date_end),
                today = new Date();

            return today > startDate && today <= endDate;
        }

        function dateFromString(dateString) {
            var dateArr = dateString.split('.');

            return new Date(dateArr[0], (dateArr[1] - 1), dateArr[2]);
        }

        function isCurrentLesson(lesson) {
            var now = new Date().getTime(),
                lessonStart = new Date().setHours(lesson.time_start_hour, lesson.time_start_minute),
                lessonEnd = new Date().setHours(lesson.time_end_hour, lesson.time_end_minute);

            return lessonStart <= now && now <= lessonEnd;
        }

        var todaysDay = new Date().getDay(),
            getResult = function(params) {
                var result = $q.defer();

                Schedule
                    .get(params, function(data) {
                        var schedule,
                            highlightToday = isCurrentWeek(data.week);

                        if (data.error) {
                            result.reject({
                                errorMessage: data.text
                            });
                        }

                        schedule = data.days
                            .map(function(day, dayIdx) {
                                var lessonsStartTimes = [],
                                    overlapLessons = {},
                                    lessons;

                                day.today = (highlightToday && todaysDay === day.weekday % 7) ?
                                    'yes' : 'no';

                                lessons = day.lessons.map(function(lesson, lessonIdx) {
                                    var timeStart = lesson.time_start.split(":"),
                                        timeEnd = lesson.time_end.split(":");

                                    lesson.uniq_id = 'lesson_id_' + dayIdx + '-' + lessonIdx;

                                    lesson.time_start_hour = timeStart[0];
                                    lesson.time_start_minute = timeStart[1];
                                    lesson.time_end_hour = timeEnd[0];
                                    lesson.time_end_minute = timeEnd[1];

                                    lesson.startPosition = (timeStart[0] - 7);
                                    lesson.duration = lesson.time_end_hour - lesson.time_start_hour + 1;

                                    return lesson;
                                });

                                lessons.forEach(function(lesson, lessonId, lessons) {
                                    lesson.className = 'lesson_start_' + lesson.startPosition;
                                    lesson.className += ' lesson_duration_' + lesson.duration;
                                    if (lessonsStartTimes.indexOf(lesson.time_start) != -1) {
                                        lesson.className += ' lesson_double';
                                    }
                                    lessonsStartTimes.push(lesson.time_start);

                                    var others = lessons
                                        .filter(function(otherLesson, otherLessonId) {
                                            return otherLessonId > lessonId;
                                        })
                                        .filter(function(otherLesson) {
                                            if (lesson.time_start_hour < otherLesson.time_start_hour
                                                && lesson.time_end_hour < otherLesson.time_start_hour) {
                                                return false;
                                            }

                                            if (otherLesson.time_start_hour < lesson.time_start_hour
                                                && otherLesson.time_end_hour < lesson.time_start_hour) {
                                                return false;
                                            }

                                            overlapLessons[otherLesson.uniq_id] = lesson.uniq_id;
                                            return true;
                                        });

                                    if (others.length > 0) {
                                        lesson.className += ' lesson_overlaps';
                                        lesson.overlapId = lesson.uniq_id;
                                    }

                                    if (overlapLessons[lesson.uniq_id] !== undefined) {
                                        lesson.className += ' lesson_overlaps lesson_overlaps_over';
                                        lesson.overlapId = overlapLessons[lesson.uniq_id];
                                    }

                                    if (day.today == 'yes' && isCurrentLesson(lesson)) {
                                        lesson.className += ' lesson_current'
                                    }
                                });

                                day.lessons = lessons;
                                return day;
                            })
                            .sort(function(cur, prev) {
                                return cur.weekday - prev.weekday;
                            });

                        data.schedule = schedule;

                        result.resolve(data)
                    });

                return result.promise;
            };

        return {
            getResult: getResult
        }
    }
]);
