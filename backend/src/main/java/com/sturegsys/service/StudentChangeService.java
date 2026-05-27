package com.sturegsys.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sturegsys.entity.StudentChange;

import java.util.List;
import java.util.Map;

public interface StudentChangeService extends IService<StudentChange> {
    
    Page<StudentChange> pageChanges(int page, int size, String studentName, 
                                     String changeType, String status);
    
    List<StudentChange> listByStudentId(String studentId);
    
    boolean addChange(StudentChange change);
    
    boolean reviewChange(String changeId, String status, String comment, 
                         String reviewerId, String reviewerName);
    
    List<Map<String, Object>> getChangeTypeStatistics();
}
